import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {Spell} from "../../spell";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropListGroup, CdkDropList, CdkDrag } from "@angular/cdk/drag-drop";
import {SpellDialogComponent} from "./spell-dialog/spell-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {GameService} from "../../game.service";
import { TitleCasePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { MatList, MatListItem } from '@angular/material/list';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { CharacterSpellSlotsComponent } from './character-spell-slots/character-spell-slots.component';

@Component({
    selector: 'character-spell-book',
    templateUrl: './character-spell-book.component.html',
    styleUrls: ['./character-spell-book.component.sass'],
    imports: [CdkDropListGroup, MatCard, MatCardContent, MatIcon, MatTooltip, MatTabGroup, MatTab, MatList, CdkDropList, MatListItem, CdkDrag, MatMiniFabButton, MatDivider, CharacterSpellSlotsComponent, TitleCasePipe]
})
export class CharacterSpellBookComponent implements OnInit {
  @Input() character: Character;
  constructor(public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit(): void {
  }

  spellContainingBlocks(){
    return [...this.character.getAllMagicUserBlocks(), ...this.character.getAllClericBlocks()]
  }
  openSpellDialog(spellbook, spell, level, characterClass?){
    if(this.gameService.lock)
      return;
    const dialogRef = this.dialog.open(SpellDialogComponent,{
      data: {
        spellbook: spellbook,
        spell: spell,
        level: level,
        characterClass: characterClass
      }
    });
  }

  removeSpell(block, spell){
    block.spellbook.removeSpell(spell);
  }

  memorizeSpell(block, spell){
    block.spells[spell.level-1].insert(spell);
  }
  drop(event: CdkDragDrop<Spell[]>){
    if(this.gameService.lock)
      return;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }
}
