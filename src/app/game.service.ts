import {Injectable} from '@angular/core';
import {Game} from "./game";
import {interval} from "rxjs";
import {Character} from "./character";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game;

  getGame(): Game {
    return this.game;
  }

  importGame(json) {
    this.game = new Game(JSON.parse(json));
    interval(3000)
      .subscribe((val) => {
        localStorage.setItem('odnd-character', JSON.stringify(this.game))
      });

  }

  newGame(){
    this.game = new Game({character: new Character(), notes: [], sessions: []});
    return this.game;
  }

  constructor() {
  }


}
