import {Component, Inject, OnInit} from '@angular/core';
import {Spell} from "../../../spell";
import {SpellBook} from "../../../spell-book";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-spell-dialog',
  templateUrl: './spell-dialog.component.html',
  styleUrls: ['./spell-dialog.component.sass']
})
export class SpellDialogComponent implements OnInit {
  spell: Spell;
  spellbook: SpellBook;

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.spellbook = data.spellbook;
    let level = data.level ? data.level : 0
    if(!data.spell)
      this.spell = new Spell({level:level});
    else
      this.spell = data.spell;
  }

  ngOnInit(): void {
  }

  upsertSpell(){
    if(this.spellbook)
      this.spellbook.spells.push(this.spell);
  }

}
