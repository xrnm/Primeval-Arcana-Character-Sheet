import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-purse',
  templateUrl: './character-purse.component.html',
  styleUrls: ['./character-purse.component.sass']
})
export class CharacterPurseComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.character = this.gameService.getGame().getCharacter();
  }
}
