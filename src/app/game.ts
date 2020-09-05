import {Note} from "./note";
import {Character} from "./character";
import {Session} from "./session";

export class Game {
  character: Character;
  sessions: Session[];
  notes: Note[];

  getCharacter(): Character {
    return this.character;
  }

  getSessions(): Session[] {
    return this.sessions;
  }

  getNotes(): Note[] {
    return this.notes;
  }

  getName(): string {
    return `${this.character.name} -- ${this.character.getConciseClassLevelString()} ${this.character.race} `
  }

  constructor(init?: Partial<Game>) {
    Object.assign(this, init);
    this.character = new Character(init.character);
    this.sessions = init.sessions.map(item => new Session(item));
    this.notes = init.notes.map(item => new Note(item));
  }
}
