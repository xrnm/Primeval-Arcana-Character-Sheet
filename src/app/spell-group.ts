import {Spell} from "./spell";
import {SpellSlotHelper} from "./spell-slot-helper";
import {Character} from "./character";

export class SpellGroup {
  spells: Spell[];
  slots: number;
  level: number;

  constructor(init?: Partial<SpellGroup>) {
    Object.assign(this, init);
  }

  firstEmpty() {
    return this.spells.map(sp => !!sp).filter(sp => sp).length
  }

  insert(spell: Spell) {
    if(this.full()) return;

    this.spells[this.firstEmpty()] = spell
  }

  full() {
    return this.spells.map(sp => !!sp).filter(sp => sp).length == this.slots;
  }

  importSpells(spellGroups: SpellGroup[]) {
    const matchingLevelGroup =  spellGroups.find(sg => sg.level == this.level)
      if(matchingLevelGroup)
        matchingLevelGroup.spells.forEach(sp => this.insert(sp))
  }

}
