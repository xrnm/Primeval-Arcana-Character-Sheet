import {Game} from "../game";
import {CharacterSummary} from "./character-summary";

export interface CharacterRepository {
  list(): Promise<CharacterSummary[]>;
  listByCampaign(campaignId: string): Promise<CharacterSummary[]>;
  load(id: string): Promise<Game | null>;
  create(game: Game, campaignId?: string): Promise<Game>;
  save(game: Game): Promise<void>;
  // Best-effort synchronous persistence for page-hide/unload (localStorage write, or keepalive fetch).
  saveSync(game: Game): void;
  // Move a character to another campaign (account mode only).
  setCampaign(id: string, campaignId: string): Promise<void>;
  delete(id: string): Promise<void>;
}
