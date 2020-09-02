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

  static highestSpellLevel(character: Character): number {
    return this.allSpellSlots(character).length
  }

  static allSpellSlots(character: Character) {
    if (character.getInitialClass() == 'Magic User')
      return this.magicUserSpellSlots(character.getLevel());
    else if (character.getInitialClass() == 'Cleric')
      return this.clericSpellSlots(character.getLevel());
    else
      return [];
  }

  static spellSlots(character:  Character, level: number): number{
    return this.allSpellSlots(character)[level-1]
  }

  static highestSpellQuantity(character: Character): number {
    let quantity;
    if (character.getInitialClass() == 'Magic User')
      quantity = this.magicUserSpellSlots(character.getLevel())[0];
    else if (character.getInitialClass() == 'Cleric')
      quantity = this.clericSpellSlots(character.getLevel())[0];
    else
      return 0;

    if (!quantity)
      return 0;

    return quantity;
  }

  static magicUserSpellSlots(level) {
    return this.MAGIC_USER_SPELL_SLOTS[level]
  }

  static clericSpellSlots(level) {
    return this.CLERIC_SPELL_SLOTS[level]
  }
}
