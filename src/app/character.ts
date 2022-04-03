import {Loadable} from "./loadable";
import {Container} from "./container";
import {Item} from "./item";
import {Purse} from "./purse";
import {ExperienceBlock} from "./experience-block";
import {HitDiceHelper} from "./hit-dice-helper";
import {SpellBook} from "./spell-book";
import {SpellGroup} from "./spell-group";
import {SavingThrowsHelper} from "./saving-throws-helper";
import {Mount} from "./mount";
import {Experience} from "./experience";

export class Character implements Loadable {
  name: string;
  race: string;
  age: number;
  sex: string;
  profession: string;
  origin: string;
  alignment: string;
  height_inch: number;
  height_foot: number;
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
  experience: ExperienceBlock[] = [new ExperienceBlock({class: 'Fighter', prime: 'strength', experiences: []})];
  purse: Purse = new Purse();
  magic_items: Item[] = [];
  known_languages: String[] = [];
  weapons: Item[] = [];
  armor: Item[] = [];
  slung_items: Container[] = [];
  appearance: string;
  clothing: string;
  quests: string;
  will: string;

  // these are deprecated, do not use.
  spellbook: SpellBook = new SpellBook();
  spells: SpellGroup[];

  hirelings: Character[];
  mounts: Mount[] = [];

  deleted: boolean = false;

  constructor(init?: Partial<Character>) {
    if (!init) return;


    Object.assign(this, init);

    if (init.experience)
      this.experience = init.experience.map((experience) => new ExperienceBlock(experience));

    // If storing data on character.spellbook or character.spells move that into the first XP block
    // and clear out the deprecated field
    if(init.spellbook){
      this.getExperience()[0].spellbook = new SpellBook(init.spellbook)
      this.spellbook = null
    }

    if (init.spells){
      this.getExperience()[0].initializeSpells()
      this.getExperience()[0].spells.map(sg => sg.importSpells(init.spells));
      this.spells = null
    }

    this.initializeExperienceBonus();


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



    if (init.hirelings)
      this.hirelings = init.hirelings.map(hireling => new Character(hireling));
    else
      this.hirelings = [];

    if (init.mounts)
      this.mounts = init.mounts.map(m => new Mount(m));
  }

  initializeExperienceBonus() {
    this.experience = this.experience.map((experience) => {
      const primeScore = this.abilities[experience.prime];

      if (primeScore > 14)
        experience.bonus_xp = 10;
      else if (primeScore > 12)
        experience.bonus_xp = 5;
      else
        experience.bonus_xp = 0;

      return experience;
    });
  }




  getInitialClass() {
    return this.getExperience()[0].class
  }

  hitDice() {
    return this.getExperience().map((block)=> {
      switch (block.class) {
        case 'Fighter':
          return HitDiceHelper.fighterHitDice(this.getFighterLevel());
        case 'Cleric':
          return HitDiceHelper.clericHitDice(this.getClericLevel());
        case 'Magic User':
          return HitDiceHelper.magicUserHitDice(this.getMagicUserLevel());
        default:
          return {base: -1, bonus: -1}
      }
    }).reduce((previous,current)=>{
      // This is calculated on maximum possible XP.
      // A 7 + 7 beats an 8 because 42 + 7 = 49 and 8 * 6 = 48
      if(previous.base*6 + previous.bonus > current.base*6 + current.bonus)
        return previous
      return current

    }, {base: -1, bonus: -1})
  }

  getHighestClassLevel(className): number {
    return this.getExperience()
      .filter(b => b.class == className)
      .reduce((p, c) => p > c.currentLevel() ? p : c.currentLevel(), 0)
  }

  getConciseClassLevelString() {
    const fighterLevel = this.getFighterLevel()
    const clericLevel = this.getClericLevel()
    const magicUserLevel = this.getMagicUserLevel()
    let str = '('
    if (fighterLevel > 0)
      str += 'F' + fighterLevel

    if (clericLevel > 0)
      str += 'C' + clericLevel

    if (magicUserLevel > 0)
      str += 'M' + magicUserLevel
    str += ')'
    return str
  }

  getClericLevel(): number {
    return this.getHighestClassLevel('Cleric')
  }

  getFighterLevel(): number {
    return this.getHighestClassLevel('Fighter')
  }

  getMagicUserLevel(): number {
    return this.getHighestClassLevel('Magic User')
  }

  getAllClericBlocks(): ExperienceBlock[]{
    return this.getExperience().filter(b=>b.class=='Cleric')
  }

  getAllMagicUserBlocks(): ExperienceBlock[]{
    return this.getExperience().filter(b=>b.class=='Magic User')
  }

  getAbilityAbbreviation(ability): string {
    if (!ability)
      ability = ''
    switch (ability.toLowerCase()) {
      case 'strength':
        return 'STR'
      case 'intelligence':
        return 'INT'
      case 'wisdom':
        return 'WIS'
      case 'dexterity':
        return 'DEX'
      case 'constitution':
        return 'CON'
      case 'charisma':
        return 'CHA'
      default:
        return ''
    }
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
    return this.adjustedAbility('strength') * 150
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


  primeAbilities() {
    return this.getExperience().map(e => {
      return {ability: e.prime, level: e.currentLevel()};
    })
  }

  abilityIsPrime(ability) {
    return this.primeAbilities().filter(b => b.ability == ability).length > 0
  }

  adjustedAbilityString(abilityName, stripSpaces = false): string {
    let str = '' + this.abilities[abilityName];
    const ability = this.primeAbilities().find(b => b.ability == abilityName)
    if (ability)
      str += ' + ' + ability.level
    if (stripSpaces)
      str = str.replace(/\s/g, '');
    return str
  }

  adjustedAbility(abilityName): number {
    let adjustedAbility = this.abilities[abilityName];
    const ability = this.primeAbilities().find(b => b.ability == abilityName)
    if (ability)
      adjustedAbility += ability.level
    return adjustedAbility
  }

  getSavingThrows() {
    return SavingThrowsHelper.getBestSavingThrows(this)
  }

  getSystemShock(): number {
    return 20 - (this.adjustedConstitution() + this.getHighestLevel());
  }
  getHighestLevel(): number{
    return this.getExperience()
      .reduce((maxlvl,block)=> maxlvl > block.currentLevel() ? maxlvl : block.currentLevel(), 0)
  }

  adjustedDexterity(): number {
    return this.adjustedAbility('dexterity');
  }

  adjustedConstitution(): number {
    return this.adjustedAbility('constitution');
  }

  precisionThrownWeight(): number {
    return 10 * (this.adjustedAbility('strength') / 2);
  }

  precisionThrownDistance(): number {
    return this.adjustedDexterity() * 10;
  }

  maximumLift(): number {
    return this.adjustedAbility('strength') * 250
  }

  continuousTravel(): number {
    return this.adjustedConstitution() + this.getHighestLevel();
  }

  holdBreath(): number {
    return (this.adjustedConstitution() + this.getHighestLevel()) * 10;
  }

  continuousMaximumEffort(): number {
    return this.adjustedConstitution() + this.getHighestLevel();
  }

  getSlottedContainers(): Container[] {
    return this.getSlungItems().filter(item => item.slots > 0)
  }

  getSlungItems(): Container[] {
    return this.slung_items.filter(item => !item.deleted);
  }

  displayHeight() {
    if (!this.height_foot && !this.height_inch)
      return '';
    return `${this.height_foot ? this.height_foot : 0}' ${this.height_inch ? this.height_inch : 0}"`
  }

  getMounts() {
    return this.mounts.filter(m => !m.deleted);
  }

  hasPositiveAbilityAdjustment(ability: string): boolean {
    const adjustedAbility = this.adjustedAbility(ability);

    if (ability == 'strength')
      return adjustedAbility >= 14;
    else if (ability == 'intelligence')
      return adjustedAbility >= 11;
    else if (ability == 'wisdom')
      return adjustedAbility >= 11;
    else if (ability == 'dexterity')
      return adjustedAbility >= 14;
    else if (ability == 'constitution')
      return adjustedAbility >= 14;
    else if (ability == 'charisma')
      return adjustedAbility >= 14;
    else
      return false;
  }

  hasNegativeAbilityAdjustment(ability: string): boolean {
    const adjustedAbility = this.adjustedAbility(ability);
    if (ability == 'intelligence')
      return adjustedAbility <= 7;
    else if (ability == 'constitution')
      return adjustedAbility <= 5;
    else if (ability == 'charisma')
      return adjustedAbility <= 6;
    else
      return false;
  }

  getExperience(): ExperienceBlock[] {
    return this.experience.filter(b => !b.deleted)
  }

  static classes() {
    return ['Fighter', 'Cleric', 'Magic User'];
  }

  static abilities() {
    return ['strength', 'intelligence', 'wisdom', 'dexterity', 'constitution', 'charisma'];
  }

  experienceBlockCount() {
    return this.getExperience().length
  }

  addExperience(experience: Experience) {

    this.getExperience().forEach((block, index) => {
      if (index == 0)
        return;
      const xp = this.getBlockExperience(experience, index)
      block.addExperience(new Experience({
        date: experience.date,
        points: xp,
        notes: experience.notes,
      }))
    })

    let initialBlock = this.getExperience()[0];
    const xp = this.getBlockExperience(experience, 0);
    initialBlock.addExperience(new Experience({
      date: experience.date,
      points: xp,
      notes: experience.notes,
    }))
  }

  getBlockExperience(experience, index) {
    // Are any classes maxed?
    const maxedClasses = this.getMaxedExperienceBlocks();
    const maxedClassPrimes = maxedClasses.map(b => b.prime)

    // If maxed you don't get any XP
    if (maxedClassPrimes.length && maxedClassPrimes.includes(this.getExperience()[index].prime))
      return 0

    // Get XP and subtract out any remainders
    let hangoverXp = experience.points % (this.experienceBlockCount() - maxedClasses.length)
    const totalXp = experience.points - hangoverXp;

    // Split between classes
    let classXp = totalXp / (this.experienceBlockCount() - maxedClasses.length)

    // If there is hangoverXP enough for this class, add it in
    if (index - maxedClasses.length < hangoverXp)
      classXp += 1

    return classXp
  }

  getMaxedExperienceBlocks() {
    return this.getExperience().filter(b => b.currentLevel() == this.abilities[b.prime])
  }

}
