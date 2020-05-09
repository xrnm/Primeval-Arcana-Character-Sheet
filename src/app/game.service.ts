import {Injectable} from '@angular/core';
import {Game} from "./game";
import {interval} from "rxjs";
import {Character} from "./character";
import {Title} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game;

  getGame(): Game {
    return this.game;
  }

  importGame(json) {
    if(!json){
      this.titleService.setTitle('ODND Character Sheet');
      return
    }

    this.game = new Game(JSON.parse(json));
    this.titleService.setTitle(this.game.getName());

    this.beginCaching();
  }

  newGame(){
    this.game = new Game({character: new Character({base_movement: 60}), notes: [], sessions: []});
    this.beginCaching();
    return this.game;
  }

  beginCaching(){
    interval(3000)
      .subscribe((val) => {
        //Store the old character
        localStorage.setItem('odnd-character', JSON.stringify(this.game));

        // Update title with any changes
        this.titleService.setTitle(this.game.getName());
      });
  }

  constructor(private titleService: Title) {
  }


}
