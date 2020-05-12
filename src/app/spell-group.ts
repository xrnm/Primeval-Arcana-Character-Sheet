import {Spell} from "./spell";

export class SpellGroup {
  spells: Spell[];
  slots: number;
  level: number;

  constructor(init?: Partial<SpellGroup>) {
    Object.assign(this, init);
  }

  firstEmpty(){
  return this.spells.map(sp=>!!sp).filter(sp=>sp).length
  }

  insert(spell: Spell){
    this.spells[this.firstEmpty()] = spell
  }
  full(){
    return this.spells.map(sp=>!!sp).filter(sp=>sp).length == this.slots;
  }

}
