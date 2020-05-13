import { Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-attributes',
  templateUrl: './character-attributes.component.html',
  styleUrls: ['./character-attributes.component.sass']
})
export class CharacterAttributesComponent implements OnInit {
  @Input() character: Character;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  changeAbility(ability, delta){
    if(this.gameService.lock)
      return;
    this.character.abilities[ability] += delta;
  }

}
