import {Injectable} from '@angular/core';
import {Game} from "../game";
import {CharacterRepository} from "./character-repository";
import {CharacterSummary, summarize} from "./character-summary";
import {supabase} from "./supabase.client";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";

const CACHE_PREFIX = 'odnd-cache:';
const UNIQUE_VIOLATION = '23505';

@Injectable({
  providedIn: 'root'
})
export class SupabaseRepository implements CharacterRepository {

  constructor(private authService: AuthService) {}

  async list(): Promise<CharacterSummary[]> {
    return this.query(supabase.from('characters').select('id, data, updated_at'));
  }

  async listByCampaign(campaignId: string): Promise<CharacterSummary[]> {
    return this.query(supabase.from('characters').select('id, data, updated_at').eq('campaign_id', campaignId));
  }

  private async query(builder): Promise<CharacterSummary[]> {
    const {data, error} = await builder.order('updated_at', {ascending: false});
    if (error)
      throw error;
    return (data || []).map(row => {
      const summary = summarize(new Game(row.data));
      summary.updatedAt = row.updated_at;
      return summary;
    });
  }

  async getCampaignId(id: string): Promise<string | null> {
    const {data, error} = await supabase.from('characters').select('campaign_id').eq('id', id).maybeSingle();
    if (error || !data)
      return null;
    return data.campaign_id;
  }

  async load(id: string): Promise<Game | null> {
    const {data, error} = await supabase
      .from('characters')
      .select('data')
      .eq('id', id)
      .maybeSingle();
    if (error) {
      // Fall back to the offline cache when the network is unavailable.
      const cached = localStorage.getItem(CACHE_PREFIX + id);
      return cached ? new Game(JSON.parse(cached)) : null;
    }
    if (!data)
      return null;
    const game = new Game(data.data);
    this.cache(game);
    return game;
  }

  async create(game: Game, campaignId?: string): Promise<Game> {
    for (let attempt = 0; attempt < 4; attempt++) {
      const {error} = await supabase.from('characters').insert({id: game.id, data: game, campaign_id: campaignId});
      if (!error) {
        this.cache(game);
        return game;
      }
      // A colliding id means the blob was imported/claimed elsewhere; mint a fresh identity and retry.
      if (error.code === UNIQUE_VIOLATION) {
        game.id = crypto.randomUUID();
        continue;
      }
      throw error;
    }
    throw new Error('Could not create character: id kept colliding');
  }

  async save(game: Game): Promise<void> {
    this.cache(game);
    const {error} = await supabase.from('characters').update({data: game}).eq('id', game.id);
    if (error)
      throw error;
  }

  saveSync(game: Game): void {
    this.cache(game);
    const token = this.authService.session$.value?.access_token;
    if (!token)
      return;
    // supabase-js has no keepalive; use a raw REST PATCH so an in-flight save survives page unload.
    fetch(`${environment.supabaseUrl}/rest/v1/characters?id=eq.${game.id}`, {
      method: 'PATCH',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'apikey': environment.supabaseKey,
        'Authorization': `Bearer ${token}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({data: game})
    });
  }

  async setCampaign(id: string, campaignId: string): Promise<void> {
    const {error} = await supabase.from('characters').update({campaign_id: campaignId}).eq('id', id);
    if (error)
      throw error;
  }

  async delete(id: string): Promise<void> {
    localStorage.removeItem(CACHE_PREFIX + id);
    const {error} = await supabase.from('characters').delete().eq('id', id);
    if (error)
      throw error;
  }

  private cache(game: Game) {
    localStorage.setItem(CACHE_PREFIX + game.id, JSON.stringify(game));
  }
}
