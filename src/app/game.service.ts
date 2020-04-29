import { Injectable } from '@angular/core';
import {CHLORR} from "./chlorr";
import {Character} from "./character";
import {Game} from "./game";
import {Session} from "./session";
import {Note} from "./note";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game = CHLORR

  constructor() { }

  getCharacter() : Character{
    return this.game.character;
  }
  getSessions() : Session[]{
    return this.game.sessions;
  }
  getNotes() : Note[]{
    return this.game.notes;
  }
}
