import {Spell} from "./spell";
import {SpellSlotHelper} from "./spell-slot-helper";

export class SpellBook {
  spells: Spell[] = [];

  constructor(init?: Partial<SpellBook>, characterClass?: String) {
    Object.assign(this, init);

    if (init && init.spells) {
      this.spells = init.spells.map(spell => new Spell(spell));

      // Initialize Cleric Spells
      if (init.spells.length < 1 && characterClass === 'Cleric') {
        this.spells = SpellSlotHelper.initializeClericSpells()
      }
    }

  }

  getSpells(level: number) {
    return this.spells.filter(spell => spell.level == level)
  }

  removeSpell(spell) {
    if (confirm("Are you sure you want to unlearn " + spell.name))
      this.spells = this.spells.filter(s => s != spell)
  }
}
