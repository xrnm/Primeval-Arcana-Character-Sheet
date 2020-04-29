import { Component, OnInit } from '@angular/core';
import { Character} from "../character";
import {GameService} from "../game.service";

@Component({
  selector: 'app-show-character',
  templateUrl: './show-character.component.html',
  styleUrls: ['./show-character.component.sass']
})
export class ShowCharacterComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.character = this.gameService.getCharacter();
  }

}
