import {Component, Inject, OnInit} from '@angular/core';
import {Spell} from '../../../spell';
import {SpellBook} from '../../../spell-book';
import {MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {CdkScrollable} from '@angular/cdk/scrolling';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatAutocompleteTrigger, MatAutocomplete} from '@angular/material/autocomplete';
import {MatOption} from '@angular/material/core';
import {MatButton} from '@angular/material/button';
import clericSpellData from '../../../../assets/cleric-spells.json';
import magicUserSpellData from '../../../../assets/magic-user-spells.json';

interface SpellCatalogEntry {
  level: number;
  name: string;
  description: string;
}

@Component({
    selector: 'app-spell-dialog',
    templateUrl: './spell-dialog.component.html',
    styleUrls: ['./spell-dialog.component.sass'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, FormsModule, MatAutocompleteTrigger, MatAutocomplete, MatOption, MatDialogActions, MatButton, MatDialogClose]
})
export class SpellDialogComponent implements OnInit {
  spell: Spell;
  spellbook: SpellBook;
  spellCatalog: SpellCatalogEntry[] = [];
  filteredSpells: SpellCatalogEntry[] = [];
  spellFilter: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.spellbook = data.spellbook;
    let level = data.level ? data.level : 0;
    if (!data.spell)
      this.spell = new Spell({level: level});
    else
      this.spell = data.spell;

    const characterClass = data.characterClass || '';
    if (characterClass === 'Cleric') {
      this.spellCatalog = clericSpellData as SpellCatalogEntry[];
    } else {
      this.spellCatalog = magicUserSpellData as SpellCatalogEntry[];
    }
    this.filteredSpells = this.spellCatalog;
  }

  ngOnInit(): void {
  }

  filterSpells(): void {
    if (!this.spellFilter) {
      this.filteredSpells = this.spellCatalog;
      return;
    }
    const filter = this.spellFilter.toLowerCase();
    this.filteredSpells = this.spellCatalog.filter(s =>
      s.name.toLowerCase().includes(filter)
    );
  }

  onSpellSelect(event): void {
    const name = event.option.value;
    const selected = this.spellCatalog.find(s => s.name === name);
    if (selected) {
      this.spell.name = selected.name;
      this.spell.level = selected.level;
      this.spell.description = selected.description;
    }
  }

  upsertSpell() {
    if (this.spellbook)
      this.spellbook.spells.push(this.spell);
  }
}
