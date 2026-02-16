import {DiceHelper} from './dice-helper';
import {AttributeTablesHelper} from './attribute-tables-helper';

export class NameGeneratorHelper {
  static readonly VOWELS = 'aeiouy';
  static readonly CONSONANTS = 'bcdfghjklmnpqrstvwxz';

  static generate(useTitle: boolean = false, multiBarrel: boolean = false): string {
    let name = this.generateSegment();

    if (multiBarrel) {
      const barrCount = DiceHelper.roll(3, 1);
      if (barrCount !== 1) {
        for (let i = 0; i < barrCount - 1; i++) {
          name += '-' + this.generateSegment();
        }
      }
    }

    if (useTitle) {
      name += DiceHelper.pick(AttributeTablesHelper.TITLES);
    }

    return name;
  }

  private static generateSegment(): string {
    let name = '';
    const length = DiceHelper.roll(6, 2);

    for (let i = 0; i < length; i++) {
      const vowelRoll = DiceHelper.roll(6, 1);
      const consonantRoll = DiceHelper.roll(20, 1);

      if ((vowelRoll + consonantRoll) % 2 === 0) {
        if (name.length >= 2 &&
            this.VOWELS.includes(name[name.length - 2]) &&
            this.VOWELS.includes(name[name.length - 1])) {
          name += this.CONSONANTS[consonantRoll - 1];
        } else {
          name += this.VOWELS[vowelRoll - 1];
        }
      } else {
        if (name.length >= 3 &&
            this.CONSONANTS.includes(name[name.length - 3]) &&
            this.CONSONANTS.includes(name[name.length - 2]) &&
            this.CONSONANTS.includes(name[name.length - 1])) {
          name += this.VOWELS[vowelRoll - 1];
        } else {
          name += this.CONSONANTS[consonantRoll - 1];
        }
      }
    }

    return name;
  }
}
