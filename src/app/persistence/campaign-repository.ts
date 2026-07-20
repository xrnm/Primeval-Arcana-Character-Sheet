import {Campaign} from "../campaign";
import {CampaignSummary} from "./campaign-summary";

export interface CampaignRepository {
  list(): Promise<CampaignSummary[]>;
  load(id: string): Promise<Campaign | null>;
  create(campaign: Campaign): Promise<Campaign>;
  save(campaign: Campaign): Promise<void>;
  saveSync(campaign: Campaign): void;
  delete(id: string): Promise<void>;
}
