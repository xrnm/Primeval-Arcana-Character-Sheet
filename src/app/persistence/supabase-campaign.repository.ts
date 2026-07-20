import {Injectable} from '@angular/core';
import {Campaign} from "../campaign";
import {CampaignRepository} from "./campaign-repository";
import {CampaignSummary} from "./campaign-summary";
import {supabase} from "./supabase.client";
import {AuthService} from "../auth/auth.service";
import {environment} from "../../environments/environment";

const CACHE_PREFIX = 'odnd-campaign-cache:';
const UNIQUE_VIOLATION = '23505';

@Injectable({
  providedIn: 'root'
})
export class SupabaseCampaignRepository implements CampaignRepository {

  constructor(private authService: AuthService) {}

  async list(): Promise<CampaignSummary[]> {
    const {data, error} = await supabase
      .from('campaigns')
      .select('id, name, updated_at, characters(count)')
      .order('name', {ascending: true});
    if (error)
      throw error;
    return (data || []).map(row => ({
      id: row.id,
      name: row.name,
      characterCount: row.characters?.[0]?.count || 0,
      updatedAt: row.updated_at
    }));
  }

  async load(id: string): Promise<Campaign | null> {
    const {data, error} = await supabase
      .from('campaigns')
      .select('data')
      .eq('id', id)
      .maybeSingle();
    if (error) {
      const cached = localStorage.getItem(CACHE_PREFIX + id);
      return cached ? new Campaign(JSON.parse(cached)) : null;
    }
    if (!data)
      return null;
    const campaign = new Campaign(data.data);
    this.cache(campaign);
    return campaign;
  }

  async create(campaign: Campaign): Promise<Campaign> {
    for (let attempt = 0; attempt < 4; attempt++) {
      const {error} = await supabase.from('campaigns').insert({id: campaign.id, data: campaign});
      if (!error) {
        this.cache(campaign);
        return campaign;
      }
      if (error.code === UNIQUE_VIOLATION) {
        campaign.id = crypto.randomUUID();
        continue;
      }
      throw error;
    }
    throw new Error('Could not create campaign: id kept colliding');
  }

  async save(campaign: Campaign): Promise<void> {
    this.cache(campaign);
    const {error} = await supabase.from('campaigns').update({data: campaign}).eq('id', campaign.id);
    if (error)
      throw error;
  }

  saveSync(campaign: Campaign): void {
    this.cache(campaign);
    const token = this.authService.session$.value?.access_token;
    if (!token)
      return;
    fetch(`${environment.supabaseUrl}/rest/v1/campaigns?id=eq.${campaign.id}`, {
      method: 'PATCH',
      keepalive: true,
      headers: {
        'Content-Type': 'application/json',
        'apikey': environment.supabaseKey,
        'Authorization': `Bearer ${token}`,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({data: campaign})
    });
  }

  async delete(id: string): Promise<void> {
    localStorage.removeItem(CACHE_PREFIX + id);
    const {error} = await supabase.from('campaigns').delete().eq('id', id);
    if (error)
      throw error;
  }

  private cache(campaign: Campaign) {
    localStorage.setItem(CACHE_PREFIX + campaign.id, JSON.stringify(campaign));
  }
}
