import {Experience} from "./experience";

export class ExperienceBlock {
  class: string;
  experiences: Experience[] = [];
  prime: string;
  bonus_xp: number;

  constructor(init?: Partial<ExperienceBlock>) {
    Object.assign(this, init);
    if(init && init.experiences)
      this.experiences = init.experiences.map(e=>new Experience(e));
    else
      this.experiences = [];

    this.prime = this.primeAbility()

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
  applyBonus(points){
    return Math.round(points * (1 + (this.bonus_xp / 100)));
  }

  removeExperience(experience: Experience){
    this.experiences = this.experiences.filter(e => e !=experience)
  }

  addExperience(experience: Experience){
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
  g

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
    if(this.currentLevel() == 1)
      return this.currentLevelExperience() / (this.totalExperienceForLevel(this.currentLevel()+1))

    return this.currentLevelExperience() / (this.totalExperienceForLevel(this.currentLevel()+1) - this.totalExperienceForLevel(this.currentLevel()))
  }


}

