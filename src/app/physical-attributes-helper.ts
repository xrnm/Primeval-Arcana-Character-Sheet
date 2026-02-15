import {DiceHelper} from './dice-helper';

export class PhysicalAttributesHelper {
  static generateHeight(sex: string): {foot: number, inch: number, description: string} {
    const roll = DiceHelper.roll(20, 1);

    if (sex === 'male') {
      if (roll === 1) return this.randomHeight(4, 8, 4, 11, 'Very Short');
      else if (roll < 6) return this.randomHeight(5, 0, 5, 3, 'Short');
      else if (roll < 16) return this.randomHeight(5, 4, 5, 8, 'Average');
      else if (roll < 20) return this.randomHeight(5, 9, 6, 0, 'Tall');
      else return this.randomHeight(6, 1, 6, 4, 'Very Tall');
    } else {
      if (roll === 1) return this.randomHeight(4, 6, 4, 9, 'Very Short');
      else if (roll < 6) return this.randomHeight(4, 10, 5, 1, 'Short');
      else if (roll < 16) return this.randomHeight(5, 2, 5, 6, 'Average');
      else if (roll < 20) return this.randomHeight(5, 7, 5, 10, 'Tall');
      else return this.randomHeight(5, 11, 6, 2, 'Very Tall');
    }
  }

  private static randomHeight(minFt: number, minIn: number, maxFt: number, maxIn: number,
                               description: string): {foot: number, inch: number, description: string} {
    const minTotal = minFt * 12 + minIn;
    const maxTotal = maxFt * 12 + maxIn;
    const total = DiceHelper.randomInt(minTotal, maxTotal);
    return {foot: Math.floor(total / 12), inch: total % 12, description};
  }

  static generateWeight(strength: number, constitution: number, sex: string, weightClass: string): number {
    const base = strength + constitution;
    if (sex === 'male') {
      if (weightClass === 'light') return base * 7;
      else if (weightClass === 'average') return base * 8;
      else return base * 9;
    } else {
      if (weightClass === 'light') return base * 6;
      else if (weightClass === 'average') return base * 7;
      else return base * 8;
    }
  }

  static generateAge(level: number, older: boolean): number {
    if (older) {
      return 21 + level + DiceHelper.roll(6, 3);
    } else {
      return 11 + level + DiceHelper.roll(6, 2);
    }
  }

  static generateHandedness(): string {
    const roll = DiceHelper.roll(20, 1);
    if (roll < 3) return 'Left Handed';
    else if (roll < 20) return 'Right Handed';
    else return 'Ambidextrous';
  }
}
