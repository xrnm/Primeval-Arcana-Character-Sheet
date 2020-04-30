export class HitDiceHelper {
  static fighterHitDice(level) {
    if (level == 0)
      return {base: 1, bonus: 0};

    return {base: level, bonus: level};
  }

  static clericHitDice(level) {
    if(level==0)
      return {base: 1/2, bonus:0};

    return {base: level, bonus: 0};
  }
  static magiCUserHitDice(level){
    return {base: Math.ceil(level/2), bonus: 1 - (level % 2)}
  }
}
