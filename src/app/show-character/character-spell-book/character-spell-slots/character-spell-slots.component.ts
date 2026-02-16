import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../character";
import {Spell} from "../../../spell";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, CdkDrag } from "@angular/cdk/drag-drop";
import {GameService} from "../../../game.service";
import {ExperienceBlock} from "../../../experience-block";
import { MatTabGroup, MatTab } from '@angular/material/tabs';

import { MatList, MatListItem } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'character-spell-slots',
    templateUrl: './character-spell-slots.component.html',
    styleUrls: ['./character-spell-slots.component.sass'],
    imports: [MatTabGroup, MatTab, MatList, CdkDropList, MatListItem, CdkDrag, MatTooltip, MatMiniFabButton, MatIcon, MatDivider]
})
export class CharacterSpellSlotsComponent implements OnInit {
  @Input() block: ExperienceBlock;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Spell[]>, spellGroup) {
    if(this.gameService.lock)
      return;
    spellGroup.firstEmpty();
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const spell = event.previousContainer.data[event.previousIndex];
      if (spell.level <= spellGroup.level)
        spellGroup.insert(spell)
    }
  }

  removeSpell(group, index) {
    if(this.gameService.lock)
      return;

    group.spells.splice(index, 1);
    group.spells.push(null);
  }
}
