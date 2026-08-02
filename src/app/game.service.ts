import {Injectable} from '@angular/core';
import {Game} from "./game";
import {Note} from "./note";
import {Character} from "./character";
import {Campaign} from "./campaign";
import {interval, Subscription} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";
import {Title} from "@angular/platform-browser";
import {NEW_GAME} from "./new_game";
import {CharacterRepository} from "./persistence/character-repository";
import {LocalStorageRepository} from "./persistence/local-storage.repository";
import {SupabaseRepository} from "./persistence/supabase.repository";
import {AuthService} from "./auth/auth.service";
import {CampaignService} from "./campaign.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game;
  lock: boolean = false;
  version = '1.403'
  private saveSub?: Subscription;

  getGame(): Game {
    return this.game;
  }

  updateTitle() {
    this.titleService.setTitle(this.game.getName());
  }

  getRepository(): CharacterRepository {
    return this.authService.isAuthenticated() ? this.supabaseRepo : this.localRepo;
  }

  async loadCharacter(id: string): Promise<Game | null> {
    const game = await this.getRepository().load(id);
    if (!game)
      return null;
    this.game = game;
    this.updateTitle();
    this.applyTheme();
    this.startSaveLoop();
    await this.syncActiveCampaign(id);
    this.absorbLegacyNotes();
    await this.promoteLegacyHirelings();
    return this.game;
  }

  // On first sign-in, fold the anonymous local character into the account: auto-create a
  // campaign, install the character (with its log), and return it so we can land the user on it
  // — instead of dropping them on an empty dashboard where their character seems to vanish.
  async autoConvertLocalCharacter(): Promise<Game | null> {
    if (!this.authService.isAuthenticated())
      return null;
    const raw = localStorage.getItem('odnd-character');
    if (!raw)
      return null;
    const local = new Game(JSON.parse(raw));
    if (localStorage.getItem('odnd-character-claimed') === local.id)
      return null;

    const originalId = local.id;
    // Reuse the account's existing campaign if there is one; only create "My Campaign" when there
    // are none. Prevents a duplicate "My Campaign" being spawned on every subdomain/device login.
    const existing = await this.campaignService.list();
    let campaign = existing.length ? await this.campaignService.load(existing[0].id) : null;
    if (!campaign)
      campaign = await this.campaignService.create(new Campaign({name: 'My Campaign'}));
    // Carry the character's personal log into the campaign (notes tagged with their origin).
    const origin = local.character.name || 'Unknown';
    campaign.sessions.push(...local.sessions);
    campaign.notes.push(...local.notes.map(n => new Note({name: n.name, content: n.content, source: n.source || origin})));
    await this.campaignService.save(campaign);
    local.sessions = [];
    local.notes = [];
    const created = await this.supabaseRepo.create(local, campaign.id);
    localStorage.setItem('odnd-character-claimed', originalId);
    // Remove the local copy now that it lives in the cloud — no stale blob anyone could edit
    // thinking it's still their (now cloud-backed) character.
    localStorage.removeItem('odnd-character');
    this.campaignService.setActive(campaign);
    return created;
  }

  // One-time sweep so hirelings are migrated for EVERY account character, not just ones the
  // user happens to open. Idempotent (already-promoted characters have no nested hirelings) and
  // flag-gated so it only pays the cost once per browser. Runs in the background at startup.
  async migrateAllHirelings(): Promise<void> {
    if (!this.authService.isAuthenticated() || localStorage.getItem('odnd-hirelings-migrated'))
      return;
    const summaries = await this.supabaseRepo.list();
    for (const summary of summaries) {
      const game = await this.supabaseRepo.load(summary.id);
      if (!game || game.hireling)
        continue;
      const nested = (game.character.hirelings || []).filter(h => !h.deleted);
      if (!nested.length)
        continue;
      const campaignId = await this.supabaseRepo.getCampaignId(summary.id);
      for (const hireling of nested) {
        const promoted = this.buildNewGame();
        promoted.character = new Character(hireling);
        promoted.hireling = true;
        await this.supabaseRepo.create(promoted, campaignId || undefined);
      }
      game.character.hirelings = [];
      await this.supabaseRepo.save(game);
    }
    localStorage.setItem('odnd-hirelings-migrated', '1');
  }

  // Legacy hirelings were nested inside a character; promote them to standalone campaign
  // characters tagged as hirelings, then clear the nested list. Account-only (needs a campaign).
  private async promoteLegacyHirelings(){
    const campaign = this.campaignService.activeCampaign;
    if (!campaign || !this.game || !this.game.character.hirelings?.length)
      return;
    const hirelings = this.game.character.hirelings.filter(h => !h.deleted);
    for (const hireling of hirelings) {
      const game = this.buildNewGame();
      game.character = new Character(hireling);
      game.hireling = true;
      await this.supabaseRepo.create(game, campaign.id);
    }
    this.game.character.hirelings = [];
    this.getRepository().save(this.game);
  }

  // Legacy characters carried their own notes; fold them into the campaign's shared log, tagged
  // with the character they came from, then clear them off the character so they aren't duplicated.
  private absorbLegacyNotes(){
    const campaign = this.campaignService.activeCampaign;
    if (!campaign || !this.game || !this.game.notes.length)
      return;
    const origin = this.game.character.name || 'Unknown';
    for (const note of this.game.notes)
      campaign.notes.push(new Note({name: note.name, content: note.content, source: note.source || origin}));
    this.game.notes = [];
    this.getRepository().save(this.game);
    this.campaignService.save(campaign);
  }

  async createAndOpen(game: Game, campaignId?: string): Promise<Game> {
    this.game = await this.getRepository().create(game, campaignId);
    this.updateTitle();
    this.applyTheme();
    this.startSaveLoop();
    if (campaignId)
      this.campaignService.setActive(await this.campaignService.load(campaignId));
    return this.game;
  }

  // Point the shared adventure log at the character's campaign when signed in.
  private async syncActiveCampaign(characterId: string){
    if (!this.authService.isAuthenticated()) {
      this.campaignService.setActive(null);
      return;
    }
    const campaignId = await this.supabaseRepo.getCampaignId(characterId);
    this.campaignService.setActive(campaignId ? await this.campaignService.load(campaignId) : null);
  }

  importGame(json) {
    if(!json){
      this.titleService.setTitle('Primeval Arcana Interactive Character Sheet (ICS)');
      return
    }

    this.game = new Game(JSON.parse(json));
    this.updateTitle();
    this.applyTheme();

    // Persist immediately so a freshly minted id (legacy blob migration) survives a fast close.
    this.getRepository().save(this.game);
    this.startSaveLoop();
  }

  buildNewGame(): Game {
    // Clone the template and drop its id so every new character gets its own stable identity.
    const template = JSON.parse(JSON.stringify(NEW_GAME));
    delete template.id;
    return new Game(template);
  }

  newGame(){
    this.game = this.buildNewGame();
    this.applyTheme();
    this.getRepository().save(this.game);
    this.startSaveLoop();
    return this.game;
  }

  startSaveLoop(){
    this.saveSub?.unsubscribe();
    this.saveSub = interval(2000)
      .pipe(
        map(() => JSON.stringify(this.game)),
        distinctUntilChanged()
      )
      .subscribe(() => this.getRepository().save(this.game));
  }

  private flush(){
    if (this.game)
      this.getRepository().saveSync(this.game);
  }

  getTheme(): string {
    // Theme is a global preference so the toggle works on account pages that have no active game.
    return localStorage.getItem('odnd-theme') || this.game?.theme || 'dark';
  }

  toggleTheme() {
    const newTheme = this.getTheme() === 'dark' ? 'light' : 'dark';
    localStorage.setItem('odnd-theme', newTheme);
    if (this.game) {
      this.game.theme = newTheme;
    }
    this.applyTheme();
  }

  applyTheme() {
    const theme = this.getTheme();
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }

  getLegacyLayout(): boolean {
    return this.game?.legacyLayout || false;
  }

  toggleLegacyLayout() {
    if (this.game) {
      this.game.legacyLayout = !this.game.legacyLayout;
    }
  }

  toggleLock(){
    this.lock = !this.lock
  }

  constructor(private titleService: Title, private localRepo: LocalStorageRepository,
              private supabaseRepo: SupabaseRepository, private authService: AuthService,
              private campaignService: CampaignService) {
    // Apply the saved theme at startup, before any game is loaded.
    this.applyTheme();
    document.addEventListener('visibilitychange', () => {
      if (document.hidden)
        this.flush();
    });
    window.addEventListener('pagehide', () => this.flush());
  }


}
