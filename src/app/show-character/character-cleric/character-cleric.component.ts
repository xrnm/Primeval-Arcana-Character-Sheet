import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
    selector: 'character-cleric',
    templateUrl: './character-cleric.component.html',
    styleUrls: ['./character-cleric.component.sass'],
    imports: [MatCard, MatCardContent, MatIcon, MatList, MatListItem, MatDivider, MatMiniFabButton, MatFormField, MatLabel, MatInput, FormsModule, MatButton, MatTooltip]
})
export class CharacterClericComponent implements OnInit {

  @Input() character: Character;
  editing: string = null;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }
  editSection(id){
    if(this.gameService.lock)
      return;

    this.editing = id
  }

  changePrayer(delta){
    const newVal = this.character.used_pray_slots + delta
    if(newVal >= 0 && newVal <= this.character.getTotalPrayerSlots())
      this.character.used_pray_slots = newVal
  }
  changeTurning(delta){
    const newVal = this.character.used_turning_slots + delta
    if(newVal >= 0 && newVal <= this.character.getTotalTurningSlots())
      this.character.used_turning_slots = newVal
  }

  doneEditing(){
    if(this.gameService.lock)
      return;
    this.editing = null;
  }

}
