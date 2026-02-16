export class DiceHelper {
  static randomInt(min: number, max: number): number {
    const range = max - min + 1;
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return min + (array[0] % range);
  }

  static roll(sides: number = 6, count: number = 1, modifier: number = 0,
              dropLowest: boolean = false, dropHighest: boolean = false): number {
    if (count === 0) return modifier;

    let total = 0;
    let low = Infinity;
    let high = -Infinity;

    const abs = Math.abs(count);
    const sign = count > 0 ? 1 : -1;

    for (let i = 0; i < abs; i++) {
      const sample = this.randomInt(1, sides);
      if (sample < low) low = sample;
      if (sample > high) high = sample;
      total += sample * sign;
    }

    if (dropLowest) total -= low * sign;
    else if (dropHighest) total -= high * sign;

    return total + modifier;
  }

  static pick<T>(table: T[]): T {
    return table[this.randomInt(0, table.length - 1)];
  }
}
