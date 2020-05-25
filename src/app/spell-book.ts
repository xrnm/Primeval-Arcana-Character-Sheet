import {Spell} from "./spell";

export class SpellBook {
  spells: Spell[] = [];

  constructor(init?: Partial<SpellBook>) {
    Object.assign(this, init);
    if(init && init.spells)
      this.spells = init.spells.map(spell => new Spell(spell));
  }

  getSpells(level: number) {
    return this.spells.filter(spell => spell.level == level)
  }
  removeSpell(spell){
    if(confirm("Are you sure you want to unlearn " + spell.name))
    this.spells = this.spells.filter(s=>s!=spell)
  }

}
