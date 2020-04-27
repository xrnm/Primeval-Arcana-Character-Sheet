import {Loadable} from "./loadable";

export class Character implements Loadable{
  name: string;
  level: number;
  class: string;
  race: string;
  age: number;
  sex: string;
  profession: string;
  origin: string;
  alignment: string;
  height: number;
  weight: number;
  eye_color: string;
  hair_color: string;
  hair_style: string;
  hair_length: string;
  skin_color: string;
  hit_dice: number;
  hit_dice_bonus: number;
  current_hp: number;
  total_hp: number;
  armor_class: number;
  helmet: boolean;
  shield: boolean;
  melee_th_base: number;
  melee_th_bonus: number;
  missile_th_base: number;
  missile_th_bonus: number;
  attributes: {
    strength: number,
    intelligence: number,
    wisdom: number,
    dexterity: number,
    constitution: number,
    charisma: number,
  };
  saving_throws: {
    system_shock: number,
    poison: number,
    paralysis: number,
    petrification: number,
    dragon_breath: number,
    spell: number
  };
  experience: [{
      class: string,
      next_level_xp: number,
      bonus_xp: number,
      current_xp: number
    }];

  public constructor(init?:Partial<Character>) {
    Object.assign(this, init);
  }


  load(){
    return 1
  }
}
