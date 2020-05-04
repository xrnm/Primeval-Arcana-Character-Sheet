import { Injectable } from '@angular/core';
import {CHLORR} from "./chlorr";
import {Character} from "./character";
import {Game} from "./game";
import {Observable, timer, interval} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  game: Game;
  getGame() : Game{
    return this.game;
  }

  importGame(json){
    this.game = new Game(JSON.parse(json));
    interval(3000)
      .subscribe((val) => { localStorage.setItem('odnd-character', JSON.stringify(this.game))});

  }

  constructor(){}




}
