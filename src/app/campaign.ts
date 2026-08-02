import {Session} from "./session";
import {Note} from "./note";
import {Beast} from "./beast";

export class Campaign {
  id: string;
  name: string;
  sessions: Session[];
  notes: Note[];
  bestiary: Beast[];

  getSessions(): Session[] {
    return this.sessions;
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getBestiary(): Beast[] {
    return this.bestiary;
  }

  constructor(init?: Partial<Campaign>) {
    Object.assign(this, init);
    this.id = init?.id || crypto.randomUUID();
    this.name = init?.name || 'New Campaign';
    this.sessions = (init?.sessions || []).map(item => new Session(item));
    this.notes = (init?.notes || []).map(item => new Note(item));
    this.bestiary = (init?.bestiary || []).map(item => new Beast(item));
  }
}
