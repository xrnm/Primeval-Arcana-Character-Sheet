import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {Spell} from "../../spell";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'character-spell-book',
  templateUrl: './character-spell-book.component.html',
  styleUrls: ['./character-spell-book.component.sass']
})
export class CharacterSpellBookComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }
  spellLevelsIter(){
    return Array(this.character.highestPossibleSpellLevel()).fill(0);
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
