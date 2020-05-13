import {Injectable} from '@angular/core';
import {Game} from "./game";
import {interval} from "rxjs";
import {Title} from "@angular/platform-browser";
import {NEW_GAME} from "./new_game";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game;
  lock: boolean = false;

  getGame(): Game {
    return this.game;
  }

  importGame(json) {
    if(!json){
      this.titleService.setTitle('Revived Character Sheet');
      return
    }

    this.game = new Game(JSON.parse(json));
    this.titleService.setTitle(this.game.getName());

    this.beginCaching();
  }

  newGame(){
    this.game = NEW_GAME;
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
  toggleLock(){
    this.lock = !this.lock
  }

  constructor(private titleService: Title) {
  }


}
