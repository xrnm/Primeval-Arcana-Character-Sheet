export class SavingThrowsHelper {

  static getSavingThrows(character){
    if(character.getClass()== 'Fighter')
      return SavingThrowsHelper.FIGHTER_SAVING_THROWS[character.getLevel()];
    else if(character.getClass()== 'Magic User')
      return SavingThrowsHelper.MAGIC_USER_SAVING_THROWS[character.getLevel()];
    else
      return SavingThrowsHelper.CLERIC_SAVING_THROWS[character.getLevel()];

  }

  static MAGIC_USER_SAVING_THROWS = [
    {poison: 15, paralysis: 16, petrification:15, dragon_breath: 18, spell: 13}, //0
    {poison: 13, paralysis: 14, petrification:13, dragon_breath: 16, spell: 11}, //1
    {poison: 13, paralysis: 14, petrification:13, dragon_breath: 16, spell: 11}, //2
    {poison: 13, paralysis: 14, petrification:13, dragon_breath: 16, spell: 11}, //3
    {poison: 13, paralysis: 14, petrification:13, dragon_breath: 16, spell: 11}, //4
    {poison: 13, paralysis: 14, petrification:13, dragon_breath: 16, spell: 11}, //5
    {poison: 11, paralysis: 12, petrification:11, dragon_breath: 14, spell: 9}, //6
    {poison: 11, paralysis: 12, petrification:11, dragon_breath: 14, spell: 9}, //7
    {poison: 11, paralysis: 12, petrification:11, dragon_breath: 14, spell: 9}, //8
    {poison: 11, paralysis: 12, petrification:11, dragon_breath: 14, spell: 9}, //9
    {poison: 11, paralysis: 12, petrification:11, dragon_breath: 14, spell: 9}, //10
    {poison: 9, paralysis: 10, petrification: 9, dragon_breath: 12, spell: 7}, //11
    {poison: 9, paralysis: 10, petrification: 9, dragon_breath: 12, spell: 7}, //12
    {poison: 9, paralysis: 10, petrification: 9, dragon_breath: 12, spell: 7}, //13
    {poison: 9, paralysis: 10, petrification: 9, dragon_breath: 12, spell: 7}, //14
    {poison: 9, paralysis: 10, petrification: 9, dragon_breath: 12, spell: 7}, //15
    {poison: 7, paralysis: 8, petrification: 7, dragon_breath: 10, spell: 5}, //16
    {poison: 7, paralysis: 8, petrification: 7, dragon_breath: 10, spell: 5}, //17
    {poison: 7, paralysis: 8, petrification: 7, dragon_breath: 10, spell: 5}, //18
    {poison: 7, paralysis: 8, petrification: 7, dragon_breath: 10, spell: 5}, //19
    {poison: 7, paralysis: 8, petrification: 7, dragon_breath: 10, spell: 5} //20
  ];

  static CLERIC_SAVING_THROWS = [
    {poison: 13, paralysis: 14, petrification: 16, dragon_breath: 18, spell: 17}, //0
    {poison: 11, paralysis: 12, petrification: 14, dragon_breath: 16, spell: 15}, //1
    {poison: 11, paralysis: 12, petrification: 14, dragon_breath: 16, spell: 15}, //2
    {poison: 11, paralysis: 12, petrification: 14, dragon_breath: 16, spell: 15}, //3
    {poison: 11, paralysis: 12, petrification: 14, dragon_breath: 16, spell: 15}, //4
    {poison: 9, paralysis: 10, petrification: 12, dragon_breath: 14, spell: 13}, //5
    {poison: 9, paralysis: 10, petrification: 12, dragon_breath: 14, spell: 13}, //6
    {poison: 9, paralysis: 10, petrification: 12, dragon_breath: 14, spell: 13}, //7
    {poison: 9, paralysis: 10, petrification: 12, dragon_breath: 14, spell: 13}, //8
    {poison: 7, paralysis: 8, petrification: 10, dragon_breath: 12, spell: 11}, //9
    {poison: 7, paralysis: 8, petrification: 10, dragon_breath: 12, spell: 11}, //10
    {poison: 7, paralysis: 8, petrification: 10, dragon_breath: 12, spell: 11}, //11
    {poison: 7, paralysis: 8, petrification: 10, dragon_breath: 12, spell: 11}, //12
    {poison: 5, paralysis: 6, petrification: 8, dragon_breath: 10, spell: 9}, //13
    {poison: 5, paralysis: 6, petrification: 8, dragon_breath: 10, spell: 9}, //14
    {poison: 5, paralysis: 6, petrification: 8, dragon_breath: 10, spell: 9}, //15
    {poison: 5, paralysis: 6, petrification: 8, dragon_breath: 10, spell: 9}, //16
    {poison: 3, paralysis: 4, petrification: 6, dragon_breath: 8, spell: 7}, //17
    {poison: 3, paralysis: 4, petrification: 6, dragon_breath: 8, spell: 7}, //18
    {poison: 3, paralysis: 4, petrification: 6, dragon_breath: 8, spell: 7}, //19
    {poison: 3, paralysis: 4, petrification: 6, dragon_breath: 8, spell: 7} //20
  ];

  static FIGHTER_SAVING_THROWS = [
    {poison: 14, paralysis: 15, petrification: 16, dragon_breath: 17, spell: 18}, //0
    {poison: 12, paralysis: 13, petrification: 14, dragon_breath: 15, spell: 16}, //1
    {poison: 12, paralysis: 13, petrification: 14, dragon_breath: 15, spell: 16}, //2
    {poison: 12, paralysis: 13, petrification: 14, dragon_breath: 15, spell: 16}, //3
    {poison: 10, paralysis: 11, petrification: 12, dragon_breath: 13, spell: 14}, //4
    {poison: 10, paralysis: 11, petrification: 12, dragon_breath: 13, spell: 14}, //5
    {poison: 10, paralysis: 11, petrification: 12, dragon_breath: 13, spell: 14}, //6
    {poison: 8, paralysis: 9, petrification: 10, dragon_breath: 11, spell: 12}, //7
    {poison: 8, paralysis: 9, petrification: 10, dragon_breath: 11, spell: 12}, //8
    {poison: 8, paralysis: 9, petrification: 10, dragon_breath: 11, spell: 12}, //9
    {poison: 6, paralysis: 7, petrification: 8, dragon_breath: 9, spell: 10}, //10
    {poison: 6, paralysis: 7, petrification: 8, dragon_breath: 9, spell: 10}, //11
    {poison: 6, paralysis: 7, petrification: 8, dragon_breath: 9, spell: 10}, //12
    {poison: 4, paralysis: 5, petrification: 6, dragon_breath: 7, spell: 8}, //13
    {poison: 4, paralysis: 5, petrification: 6, dragon_breath: 7, spell: 8}, //14
    {poison: 4, paralysis: 5, petrification: 6, dragon_breath: 7, spell: 8}, //15
    {poison: 4, paralysis: 5, petrification: 6, dragon_breath: 7, spell: 8}, //16
    {poison: 4, paralysis: 5, petrification: 6, dragon_breath: 7, spell: 8}, //17
    {poison: 4, paralysis: 5, petrification: 6, dragon_breath: 7, spell: 8}, //18
    {poison: 2, paralysis: 3, petrification: 4, dragon_breath: 5, spell: 6}, //19
    {poison: 2, paralysis: 3, petrification: 4, dragon_breath: 5, spell: 6} //20
  ]

}
