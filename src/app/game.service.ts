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
  version = '1.300'
  getGame(): Game {
    return this.game;
  }

  importGame(json) {
    if(!json){
      this.titleService.setTitle('Primeval Arcana Interactive Character Sheet (ICS)');
      return
    }

    this.game = new Game(JSON.parse(json));
    this.titleService.setTitle(this.game.getName());
    this.applyTheme();

    this.beginCaching();
  }

  newGame(){
    this.game = NEW_GAME;
    this.applyTheme();
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
  getTheme(): string {
    return this.game?.theme || 'dark';
  }

  toggleTheme() {
    const newTheme = this.getTheme() === 'dark' ? 'light' : 'dark';
    if (this.game) {
      this.game.theme = newTheme;
    }
    this.applyTheme();
  }

  applyTheme() {
    const theme = this.getTheme();
    if (theme === 'light') {
      document.documentElement.classList.add('light-theme');
    } else {
      document.documentElement.classList.remove('light-theme');
    }
  }

  toggleLock(){
    this.lock = !this.lock
  }

  constructor(private titleService: Title) {
  }


}
