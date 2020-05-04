import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-derived-attributes',
  templateUrl: './character-derived-attributes.component.html',
  styleUrls: ['./character-derived-attributes.component.sass']
})
export class CharacterDerivedAttributesComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.character = this.gameService.getGame().getCharacter();
  }

}
