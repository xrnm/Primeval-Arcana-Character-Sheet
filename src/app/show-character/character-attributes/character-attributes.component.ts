import { Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { MatExpansionPanel, MatExpansionPanelHeader } from '@angular/material/expansion';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'character-attributes',
    templateUrl: './character-attributes.component.html',
    styleUrls: ['./character-attributes.component.sass'],
    imports: [MatCard, MatCardContent, MatIcon, MatTooltip, MatIconButton, MatExpansionPanel, MatExpansionPanelHeader, MatList, MatListItem, MatDivider]
})
export class CharacterAttributesComponent implements OnInit {
  @Input() character: Character;
  constructor(public gameService: GameService) { }

  ngOnInit(): void {
  }

  changeAbility(ability, delta){
    if(this.gameService.lock)
      return;
    this.character.abilities[ability] += delta;
    this.character.initializeExperienceBonus();
  }

}
