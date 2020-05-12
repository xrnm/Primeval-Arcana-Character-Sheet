import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {Spell} from "../../spell";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {SpellDialogComponent} from "./spell-dialog/spell-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'character-spell-book',
  templateUrl: './character-spell-book.component.html',
  styleUrls: ['./character-spell-book.component.sass']
})
export class CharacterSpellBookComponent implements OnInit {
  @Input() character: Character;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  spellLevelsIter(){
    return Array(this.character.highestPossibleSpellLevel()).fill(0);
  }

  openSpellDialog(spellbook, spell){
    const dialogRef = this.dialog.open(SpellDialogComponent,{
      data: {
        spellbook: spellbook,
        spell: spell
      }
    });
  }
  drop(event: CdkDragDrop<Spell[]>){
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
