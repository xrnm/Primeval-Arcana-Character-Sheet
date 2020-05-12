import {Loadable} from "./loadable";
import {Container} from "./container";
import {Item} from "./item";
import {Purse} from "./purse";
import {ExperienceBlock} from "./experience-block";
import {HitDiceHelper} from "./hit-dice-helper";
import {SpellBook} from "./spell-book";
import {SpellSlotHelper} from "./spell-slot-helper";
import {SpellGroup} from "./spell-group";

export class Character implements Loadable {
  name: string;
  class: string = 'Fighter';
  race: string;
  age: number;
  sex: string;
  profession: string;
  origin: string;
  alignment: string;
  height: number;
  weight: number;
  eye_color: string;
  hair_color: string;
  hair_style: string;
  hair_length: string;
  skin_color: string;
  base_movement: number;
  current_hp: number;
  total_hp: number;
  armor_class: number;
  helmet: boolean;
  shield: boolean;
  abilities: {
    strength: number,
    intelligence: number,
    wisdom: number,
    dexterity: number,
    constitution: number,
    charisma: number,
  } = {
    strength: 0,
    intelligence: 0,
    wisdom: 0,
    dexterity: 0,
    constitution: 0,
    charisma: 0,
  };
  saving_throws: {
    system_shock: number,
    poison: number,
    paralysis: number,
    petrification: number,
    dragon_breath: number,
    spell: number
  } = {
    system_shock: 0,
    poison: 0,
    paralysis: 0,
    petrification: 0,
    dragon_breath: 0,
    spell: 0
  };
  experience: ExperienceBlock[] = [new ExperienceBlock({class: 'Fighter', experiences: []})];
  purse: Purse = new Purse();
  magic_items: Item[] = [];
  known_languages: String[] = [];
  weapons: Item[] = [];
  armor: Item[] = [];
  slung_items: Container[] = [];
  appearance: string;
  clothing: string;
  quests: string;
  spellbook: SpellBook = new SpellBook();
  spells: SpellGroup[];
  hirelings: Character[];

  constructor(init?: Partial<Character>) {
    if (!init) return;
    Object.assign(this, init);

    if(init.experience)
      this.experience = init.experience.map((experience) => new ExperienceBlock(experience));

    if (init.purse)
      this.purse = new Purse(init.purse);

    if (init.weapons)
      this.weapons = init.weapons.map((item) => new Item(item));
    if (init.magic_items)
      this.magic_items = init.magic_items.map((item) => new Item(item));
    if (init.armor)
      this.armor = init.armor.map((item) => new Item(item));
    if (init.slung_items)
      this.slung_items = init.slung_items.map((item) => new Container(item));
    if (init.spellbook)
      this.spellbook = new SpellBook((init.spellbook));

    if(init.spells)
      this.spells = init.spells.map(sg=>new SpellGroup(sg));
    else
      this.initializeSpells();

    if(init.hirelings)
      this.hirelings = init.hirelings.map(hireling=>new Character(hireling));
    else
      this.hirelings = [];
  }
  initializeSpells(){
    this.spells = SpellSlotHelper.allSpellSlots(this).map((count,index)=>{
      return new SpellGroup({slots:count, level:index+1, spells: Array(count)})
    });
  }
  getSpellGroupForLevel(level: number): SpellGroup{
    return this.spells.find(sg=>sg.level==level)
  }
  getClass(){
    return this.class;
  }
  hitDice() {
    switch (this.class) {
      case 'Fighter':
        return HitDiceHelper.fighterHitDice(this.getLevel());
      case 'Cleric':
        return HitDiceHelper.clericHitDice(this.getLevel());
      case 'Magic User':
        return HitDiceHelper.magiCUserHitDice(this.getLevel());
      default:
        return {base: -1, bonus: -1}
    }
  }

  highestPossibleSpellLevel(): number{
    return SpellSlotHelper.highestSpellLevel(this);
  }

  spellSlots(level: number) : number{
    return SpellSlotHelper.spellSlots(this,level)
  }


  load(): number {
    return this.weapons.concat(this.armor)
        .reduce((acc, item) => {
          return acc + item.totalWeight()
        }, 0) +

      this.getSlungItems().reduce((acc, container) => {
        return acc + container.load()
      }, 0)
      + this.purse.load()
  }

  maximumLoad() {
    return this.adjustedStrength() * 150
  }

  movementRating() {
    const encumbrance = this.load() / this.maximumLoad();
    if (encumbrance <= 0.25)
      return this.base_movement * 2;
    else if (encumbrance <= 0.333)
      return this.base_movement * 1.5;
    else if (encumbrance <= 0.50)
      return this.base_movement;
    else if (encumbrance <= 1)
      return this.base_movement / 2;
    else if (encumbrance <= 2)
      return this.base_movement / 4;
    else
      return 0
  }

  toHit(): number {
    let modifier = 0;
    if (this.hitDice().bonus > 0)
      return this.hitDice().base + 1;
    else if (this.hitDice().bonus < 0)
      return this.hitDice().base - 1;
    else
      return this.hitDice().base
  }

  missileToHit(): number {
    let modifier = 0;
    return this.toHit() + modifier;
  }

  meleeToHit(): number {
    let modifier = 0;
    return this.toHit() + modifier;
  }

  primeAbility() {
    switch (this.class) {
      case 'Fighter':
        return 'strength';
      case "Magic User":
        return "intelligence";
      case "Cleric":
        return "wisdom";
    }
  }

  adjustedStrength(): number {
    let modifier = 0;

    if (this.class == 'Fighter')
      modifier += 1;

    return this.abilities.strength + modifier;
  }

  adjustedDexterity(): number {
    let modifier = 0;

    return this.abilities.dexterity + modifier;
  }

  adjustedConstitution(): number {
    let modifier = 0;

    return this.abilities.dexterity + modifier;
  }

  precisionThrownWeight(): number {
    return 10 * (this.adjustedStrength() / 2);
  }

  precisionThrownDistance(): number {
    return this.adjustedDexterity() * 10;
  }

  maximumLift(): number {
    return this.adjustedStrength() * 250
  }

  continuousTravel(): number {
    return this.adjustedConstitution() + this.getLevel();
  }

  holdBreath(): number {
    return (this.adjustedConstitution() + this.getLevel()) * 10;
  }

  continuousMaximumEffort(): number {
    return this.adjustedConstitution() + this.getLevel();
  }

  getLevel(): number {
    return this.experience.map((item) => {
      return item.currentLevel();
    })
      .filter((item) => !isNaN(item))
      .reduce((item, max) => item > max ? item : max, -1);
  }
  getSlottedContainers(): Container[]{
    return this.getSlungItems().filter(item => item.slots > 0)
  }

  getSlungItems(): Container[]{
    return this.slung_items.filter(item => !item.deleted);
  }
  displayHeight(){
    return `${Math.floor(this.height/12)}'${this.height%12}'' (${this.height}'')`
  }


  static classes() {
    return ['Fighter', 'Cleric', 'Magic User'];
  }

  getSpell

}
