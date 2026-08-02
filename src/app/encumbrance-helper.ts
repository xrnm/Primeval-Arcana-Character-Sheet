export class EncumbranceHelper {
  // Encumbrance Levels and Movement Ratings. Each band is an inclusive ceiling expressed as a
  // multiple of maximum load, paired with the base movement multiplier it allows.
  static readonly LEVELS: {name: string, maximumRatio: number, movement: number}[] = [
    {name: 'Unburdened', maximumRatio: 1 / 4, movement: 2},
    {name: 'Light', maximumRatio: 1 / 3, movement: 1.5},
    {name: 'Medium', maximumRatio: 1 / 2, movement: 1},
    {name: 'Heavy', maximumRatio: 1, movement: 0.5},
    {name: 'Extreme', maximumRatio: 2, movement: 0.25},
    {name: 'Immobile', maximumRatio: Infinity, movement: 0},
  ];

  static getLevel(encumbrance: number): {name: string, maximumRatio: number, movement: number} {
    return this.LEVELS.find(level => encumbrance <= level.maximumRatio) || this.LEVELS[this.LEVELS.length - 1];
  }
}
