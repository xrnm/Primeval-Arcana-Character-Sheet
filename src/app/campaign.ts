import {Session} from "./session";
import {Note} from "./note";

export class Campaign {
  id: string;
  name: string;
  sessions: Session[];
  notes: Note[];

  getSessions(): Session[] {
    return this.sessions;
  }

  getNotes(): Note[] {
    return this.notes;
  }

  constructor(init?: Partial<Campaign>) {
    Object.assign(this, init);
    this.id = init?.id || crypto.randomUUID();
    this.name = init?.name || 'New Campaign';
    this.sessions = (init?.sessions || []).map(item => new Session(item));
    this.notes = (init?.notes || []).map(item => new Note(item));
  }
}
