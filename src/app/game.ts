import {Note} from "./note";
import {Character} from "./character";
import {Session} from "./session";

export class Game {
  character: Character;
  sessions: Session[];
  notes: Note[];

  constructor(init?:Partial<Game>) {
    Object.assign(this, init);
  }
}
