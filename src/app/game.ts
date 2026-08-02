import {Note} from "./note";
import {Character} from "./character";
import {Session} from "./session";
import {Beast} from "./beast";

export class Game {
  id: string;
  campaign: string;
  status: 'alive' | 'dead';
  hireling: boolean;
  character: Character;
  sessions: Session[];
  notes: Note[];
  bestiary: Beast[];
  theme: string;
  legacyLayout: boolean;

  getCharacter(): Character {
    return this.character;
  }

  getSessions(): Session[] {
    return this.sessions;
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getBestiary(): Beast[] {
    return this.bestiary;
  }

  getName(): string {
    return `${this.character.name} -- ${this.character.getConciseClassLevelString()} ${this.character.race} `
  }

  constructor(init?: Partial<Game>) {
    Object.assign(this, init);
    this.id = init.id || crypto.randomUUID();
    this.campaign = init.campaign || '';
    this.status = init.status || 'alive';
    this.hireling = init.hireling || false;
    this.character = new Character(init.character);
    this.sessions = init.sessions.map(item => new Session(item));
    this.notes = init.notes.map(item => new Note(item));
    this.bestiary = (init.bestiary || []).map(item => new Beast(item));
    this.theme = init.theme || 'dark';
    this.legacyLayout = init.legacyLayout || false;
  }
}
