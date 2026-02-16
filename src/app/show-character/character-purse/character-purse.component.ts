import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import {Game} from "../../game";
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { ItemListComponent } from '../item-list/item-list.component';
import { DecimalPipe } from '@angular/common';

@Component({
    selector: 'character-purse',
    templateUrl: './character-purse.component.html',
    styleUrls: ['./character-purse.component.sass'],
    imports: [MatCard, MatCardContent, MatList, MatIcon, MatTooltip, MatListItem, MatMiniFabButton, MatDivider, ItemListComponent, DecimalPipe]
})
export class CharacterPurseComponent implements OnInit {
  @Input() character: Character;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }
  changeCoin(type: string, delta: number, event){
    if(this.gameService.lock)
      return;

    let magnitude = 1;

    if(event.shiftKey)
      magnitude *= 10;

    if(event.ctrlKey || event.metaKey)
      magnitude *= 100;

    this.character.purse[type] += delta * magnitude;

    // Disallow negative purse values
    if(this.character.purse[type] < 0)
      this.character.purse[type] = 0

  }
}
