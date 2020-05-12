import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../../character";
import {Spell} from "../../../spell";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector: 'character-spell-slots',
  templateUrl: './character-spell-slots.component.html',
  styleUrls: ['./character-spell-slots.component.sass']
})
export class CharacterSpellSlotsComponent implements OnInit {
  @Input() character: Character;

  constructor() {
  }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Spell[]>, spellGroup) {
    spellGroup.firstEmpty();
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const spell = event.previousContainer.data[event.previousIndex];
      if (!spellGroup.full() && spell.level <= spellGroup.level)
        spellGroup.insert(spell)
    }
  }

  removeSpell(group, index) {
    group.spells.splice(index, 1);
    group.spells.push(null);
  }
}
