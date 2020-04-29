import {Loadable} from "./loadable";
import {Container} from "./container";
import {Item} from "./item";
import {Purse} from "./purse";
import {ExperienceBlock} from "./experience-block";


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
  experience: ExperienceBlock[];
  purse: Purse;
  magic_items: Item[];
  known_languages: String[];
  weapons: Item[];
  armor: Item[];
  slung_items: Container[];
  appearance: string;
  clothing: string;
  quests: string;

  constructor(init?:Partial<Character>) {
    Object.assign(this, init);
  }

  load(){
    return this.weapons.concat(this.armor)
      .reduce((acc,item)=>{return acc+item.weight},0) +
      this.slung_items.reduce((acc,container)=>{return acc + container.load()},0)
  }

  maximumLoad(){
    return this.attributes.strength * 150
  }

  primeAbility(){
    switch(this.class){
      case 'Fighter':
        return 'strength';
      case "Magic User":
        return "intelligence";
      case "Cleric":
        return "wisdom";
    }
  }

}
