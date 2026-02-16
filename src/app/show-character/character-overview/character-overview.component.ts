import { Component, OnInit, Input } from '@angular/core';
import { Character} from "../../character";
import {GameService} from "../../game.service";

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatButton, MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
    selector: 'character-overview',
    templateUrl: './character-overview.component.html',
    styleUrls: ['./character-overview.component.sass'],
    imports: [MatCard, MatCardContent, MatIcon, MatList, MatListItem, MatDivider, MatFormField, MatLabel, MatInput, FormsModule, MatButton, MatTooltip, MatMiniFabButton, MatIconButton, MatCheckbox]
})
export class CharacterOverviewComponent implements OnInit {

  constructor(private gameService: GameService) { }
  @Input() character: Character;
  editing: string = null;

  classes = Character.classes();

  editSection(id){
    if(this.gameService.lock)
      return;

    this.editing = id
  }

  doneEditing(){
    if(this.gameService.lock)
      return;
    this.editing = null;
  }
  ngOnInit(): void {
  }

  changeCharacter(attribute: string, delta: number){
    if(this.gameService.lock)
      return;
    this.character[attribute] += delta
  }
}
