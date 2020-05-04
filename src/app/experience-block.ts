import {Experience} from "./experience";

export class ExperienceBlock {
  class: string;
  experiences: Experience[] = [];
  bonus_xp: number;

  constructor(init?: Partial<ExperienceBlock>) {
    Object.assign(this, init);
    if(init && init.experiences)
      this.experiences = init.experiences.map(e=>new Experience(e));
    else
      this.experiences = []
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
    return this.currentExperience() - this.totalExperienceForLevel(this.currentLevel());
  }

  levelProgress(): number{
    return this.currentExperience() / this.totalExperienceForLevel(this.currentLevel()+1)
  }

}
