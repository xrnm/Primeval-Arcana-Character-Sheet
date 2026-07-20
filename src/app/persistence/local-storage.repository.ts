import {Injectable} from '@angular/core';
import {Game} from "../game";
import {CharacterRepository} from "./character-repository";
import {CharacterSummary, summarize} from "./character-summary";

const KEY = 'odnd-character';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageRepository implements CharacterRepository {

  async list(): Promise<CharacterSummary[]> {
    const game = this.read();
    return game ? [summarize(game)] : [];
  }

  // Anonymous mode has no campaigns; the single local character is the whole roster.
  async listByCampaign(campaignId: string): Promise<CharacterSummary[]> {
    return this.list();
  }

  async load(id: string): Promise<Game | null> {
    return this.read();
  }

  async create(game: Game, campaignId?: string): Promise<Game> {
    this.write(game);
    return game;
  }

  async save(game: Game): Promise<void> {
    this.write(game);
  }

  saveSync(game: Game): void {
    this.write(game);
  }

  async delete(id: string): Promise<void> {
    localStorage.removeItem(KEY);
  }

  private read(): Game | null {
    const raw = localStorage.getItem(KEY);
    if (!raw)
      return null;
    const parsed = JSON.parse(raw);
    const game = new Game(parsed);
    // Legacy blobs predate stable ids; persist the freshly minted id so it stays stable across reads.
    if (!parsed.id)
      this.write(game);
    return game;
  }

  private write(game: Game) {
    localStorage.setItem(KEY, JSON.stringify(game));
  }
}
