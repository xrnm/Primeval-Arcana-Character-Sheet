import {Injectable} from '@angular/core';
import {interval, Subscription} from "rxjs";
import {distinctUntilChanged, map} from "rxjs/operators";
import {Campaign} from "./campaign";
import {Session} from "./session";
import {Note} from "./note";
import {CampaignSummary} from "./persistence/campaign-summary";
import {SupabaseCampaignRepository} from "./persistence/supabase-campaign.repository";

const ACTIVE_KEY = 'odnd-active-campaign';

// Campaigns are an account-only concept, so this service always talks to the cloud repo.
@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  activeCampaign: Campaign | null = null;
  private saveSub?: Subscription;

  constructor(private repo: SupabaseCampaignRepository) {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden)
        this.flush();
    });
    window.addEventListener('pagehide', () => this.flush());
  }

  list(): Promise<CampaignSummary[]> {
    return this.repo.list();
  }

  load(id: string): Promise<Campaign | null> {
    return this.repo.load(id);
  }

  create(campaign: Campaign): Promise<Campaign> {
    return this.repo.create(campaign);
  }

  save(campaign: Campaign): Promise<void> {
    return this.repo.save(campaign);
  }

  delete(id: string): Promise<void> {
    if (this.activeCampaign?.id === id)
      this.setActive(null);
    return this.repo.delete(id);
  }

  setActive(campaign: Campaign | null){
    this.activeCampaign = campaign;
    this.saveSub?.unsubscribe();
    if (campaign) {
      localStorage.setItem(ACTIVE_KEY, campaign.id);
      this.startSaveLoop();
    } else {
      localStorage.removeItem(ACTIVE_KEY);
    }
  }

  // Restore the last-selected campaign so its context (and shared log) survives navigation/reload.
  async restoreActive(): Promise<void> {
    if (this.activeCampaign)
      return;
    const id = localStorage.getItem(ACTIVE_KEY);
    if (!id)
      return;
    const campaign = await this.load(id);
    if (campaign)
      this.setActive(campaign);
  }

  hasActive(): boolean {
    return !!this.activeCampaign;
  }

  getSessions(): Session[] {
    return this.activeCampaign?.getSessions() || [];
  }

  getNotes(): Note[] {
    return this.activeCampaign?.getNotes() || [];
  }

  private startSaveLoop(){
    this.saveSub?.unsubscribe();
    this.saveSub = interval(2000)
      .pipe(
        map(() => JSON.stringify(this.activeCampaign)),
        distinctUntilChanged()
      )
      .subscribe(() => {
        if (this.activeCampaign)
          this.repo.save(this.activeCampaign);
      });
  }

  private flush(){
    if (this.activeCampaign)
      this.repo.saveSync(this.activeCampaign);
  }
}
