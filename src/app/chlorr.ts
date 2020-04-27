import {Character} from "./character";
import {Purse} from "./purse";
import {Item} from "./item";

export let CHLORR: Character = new Character({
  armor: [], known_languages: [], slug_items: [], weapons: [], load(): number {
    return 1;
  },
  name: 'Chlorr',
  level: 1,
  class: 'Fighter',
  race: 'Human',
  age: 21,
  sex: 'Female',
  profession: 'Dog Leech',
  origin: 'Coldwater / Cintra',
  alignment: 'Neutral',
  height: 68,
  weight: 140,
  eye_color: 'Light Amber',
  hair_color: 'Dark Brown',
  hair_style: 'Straight',
  hair_length: 'Bald',
  skin_color: 'Golden',
  hit_dice: 1,
  hit_dice_bonus: 1,
  current_hp: 6,
  total_hp: 7,
  armor_class: 7,
  helmet: true,
  shield: false,
  melee_th_base: 1,
  melee_th_bonus: 1,
  missile_th_base: 1,
  missile_th_bonus: 1,
  attributes: {
    strength: 10,
    intelligence: 9,
    wisdom: 10,
    dexterity: 15,
    constitution: 10,
    charisma: 10,
  },
  saving_throws: {
    system_shock: 9,
    poison: 12,
    paralysis: 13,
    petrification: 14,
    dragon_breath: 15,
    spell: 16
  },
  experience: [
    {
      class: 'Fighter',
      next_level_xp: 2000,
      bonus_xp: 0,
      current_xp: 350,
    },
    {
      class: '',
      next_level_xp: 0,
      bonus_xp: 0,
      current_xp: 0,
    }],
  purse: new Purse({
    platinum: 11,
    gold: 8,
    silver: 3,
    copper: 9,
    gems: [new Item({name: 'Opal', quantity:1, value:11000, description: 'hi', weight: 3}), new Item({name: 'Ruby', quantity:1, value:120000, description: 'hi', weight: 3})],
  }),
  magic_items:[
    new Item({name: "Sword of fuck you", weight: 2})
  ]
});
