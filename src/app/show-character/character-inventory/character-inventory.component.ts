import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.sass']
})
export class CharacterInventoryComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.character = this.gameService.getGame().getCharacter();
  }

}
