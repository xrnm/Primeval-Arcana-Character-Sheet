import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-purse',
  templateUrl: './character-purse.component.html',
  styleUrls: ['./character-purse.component.sass']
})
export class CharacterPurseComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }
  changeCoin(type: string, delta: number, event){
    let magnitude = 1;

    if(event.shiftKey)
      magnitude *= 10;

    if(event.ctrlKey)
      magnitude *= 100;

    this.character.purse[type] += delta * magnitude;

    // Disallow negative purse values
    if(this.character.purse[type] < 0)
      this.character.purse[type] = 0

  }
}
