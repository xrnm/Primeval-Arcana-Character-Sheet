import {Character} from "./character";

export class SpellSlotHelper {

  static MAGIC_USER_SPELL_SLOTS = [
    [],
    [1],//1
    [3],//2
    [5],//3
    [6, 1],//4
    [6, 3],//5
    [6, 4, 1],//6
    [6, 5, 2],//7
    [6, 5, 3, 1],//8
    [6, 5, 4, 2],//9
    [6, 5, 4, 3, 1],//10
    [6, 6, 4, 4, 2],//11
    [6, 6, 5, 4, 3, 1],//12
    [6, 6, 6, 4, 4, 2],//13
    [6, 6, 6, 5, 4, 3, 1],//14
    [6, 6, 6, 6, 4, 4, 2],//15
    [6, 6, 6, 6, 5, 4, 3, 1],//16
    [6, 6, 6, 6, 6, 4, 4, 2],//17
    [6, 6, 6, 6, 6, 5, 4, 3, 1],//18
    [6, 6, 6, 6, 6, 6, 4, 4, 2],//19
    [6, 6, 6, 6, 6, 6, 5, 4, 3, 1],//20
  ];
  static CLERIC_SPELL_SLOTS = [
    [],
    [],//1
    [1],//2
    [2],//3
    [2, 1],//4
    [3, 1],//5
    [3, 1, 1],//6
    [3, 2, 1],//7
    [3, 2, 1, 1],//8
    [3, 3, 1, 1],//9
    [3, 3, 1, 1, 1],//10
    [3, 3, 2, 1, 1],//11
    [3, 3, 2, 1, 1, 1],//12
    [3, 3, 3, 1, 1, 1],//13
    [3, 3, 3, 1, 1, 1, 1],//14
    [3, 3, 3, 2, 1, 1, 1],//15
    [3, 3, 3, 3, 1, 1, 1],//16
    [3, 3, 3, 3, 2, 1, 1],//17
    [3, 3, 3, 3, 3, 1, 1],//18
    [3, 3, 3, 3, 3, 2, 1],//19
    [3, 3, 3, 3, 3, 3, 1],//20
  ];

  static highestSpellLevel(className: string, level: number): number {
    return this.allSpellSlots(className, level).length
  }

  static allSpellSlots(className: string,level: number) {
    if (className == 'Magic User')
      return this.magicUserSpellSlots(level);
    else if (className == 'Cleric')
      return this.clericSpellSlots(level);
    else
      return [];
  }

  static magicUserSpellSlots(level) {
    return this.MAGIC_USER_SPELL_SLOTS[level]
  }

  static clericSpellSlots(level) {
    return this.CLERIC_SPELL_SLOTS[level]
  }
}
