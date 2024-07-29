import {Experience} from "./experience";
import {SpellBook} from "./spell-book";
import {SpellGroup} from "./spell-group";
import {SpellSlotHelper} from "./spell-slot-helper";

export class ExperienceBlock {
  class: string;
  experiences: Experience[] = [];
  prime: string;
  bonus_xp: number;
  spellbook: SpellBook
  spells: SpellGroup[]
  prayerSlots: number;
  deleted: boolean

  constructor(init?: Partial<ExperienceBlock>) {
    Object.assign(this, init);
    if(init && init.experiences)
      this.experiences = init.experiences.map(e=>new Experience(e));
    else
      this.experiences = [];

    if(init && init.spellbook)
      this.spellbook = new SpellBook(init.spellbook, this.class)
    else
      this.spellbook = new SpellBook(null, this.class)

    this.initializeSpells()

    if(init && init.spells){
      this.spells.map(sg => sg.importSpells(init.spells));
    }

    if(!this.prime && (!init || !init.prime))
      this.prime = this.getPrimeFromClass()

  }
  initializeSpells() {
    this.spells = SpellSlotHelper.allSpellSlots(this.class,this.currentLevel()).map((count, index) => {
      return new SpellGroup({slots: count, level: index + 1, spells: Array(count)})
    });
  }

  highestPossibleSpellLevel(): number {
    return SpellSlotHelper.highestSpellLevel(this.class,this.currentLevel());
  }

  spellLevelsIter(){
    return Array(this.highestPossibleSpellLevel()).fill(0);
  }

  // This is only used as a fallback for defaults. It is overrideable.
  getPrimeFromClass() {
    switch (this.class) {
      case 'Fighter':
        return 'strength';
      case "Magic User":
        return "intelligence";
      case "Cleric":
        return "wisdom";
    }
  }
  applyBonus(points){
    return Math.round(points * (1 + (this.bonus_xp / 100)));
  }

  removeExperience(experience: Experience){
    this.experiences = this.experiences.filter(e => e !=experience)
  }

  addExperience(experience: Experience){
    experience.points = this.applyBonus(experience.points)
    if(experience.points > this.experienceNeededForNextLevel())
      experience.points = this.experienceNeededForNextLevel()

    this.experiences.unshift(experience);
  }

  atomicExperience(): number {
    switch (this.class) {
      case 'Fighter':
      case 'Cleric':
        return 500;
      case 'Magic User':
        return 625;
    }
  }


  currentExperience(): number {
    return this.experiences.reduce((acc, experience) => experience.points + acc, 0)
  }

  currentLevel(): number {
    if (this.currentExperience() < this.atomicExperience() * 4)
      return 1;
    return Math.floor(Math.log2(this.currentExperience() / this.atomicExperience()));
  }

  totalExperienceForLevel(level): number{
    return 2**(level) * this.atomicExperience();
  }

  currentLevelExperience(): number{
    if(this.currentLevel() == 1)
      return this.currentExperience();
    return this.currentExperience() - this.totalExperienceForLevel(this.currentLevel());
  }

  levelProgress(): number{
    return this.currentLevelExperience() / this.experienceForNextLevel()
  }

  experienceForNextLevel(): number{
    if(this.currentLevel() == 1)
      return this.totalExperienceForLevel(this.currentLevel()+1)

    return this.totalExperienceForLevel(this.currentLevel()+1) - this.totalExperienceForLevel(this.currentLevel())
  }

  experienceNeededForNextLevel(): number{
    return this.experienceForNextLevel()-this.currentLevelExperience()
  }
  delete(){
    this.deleted = true
  }

  getMemorizedSpells() {
    SpellSlotHelper.allSpellSlots(this.class, this.currentLevel()).forEach((size, index) => {
      // Set each spell group to have the correct number of slots
      if (this.spells[index])
        this.spells[index].setSlots(size);
      else
        this.spells[index] = new SpellGroup({slots: size, level: index + 1, spells: Array(size)})
    });

    // delete missing spell groups
    while (this.spells.length > SpellSlotHelper.allSpellSlots(this.class, this.currentLevel()).length)
      this.spells.pop();

    return this.spells
  }

  getTotalPrayerSlot(): number{
    if(this.class!== 'Cleric')
      return 0
    return this.currentLevel()

  }

}

