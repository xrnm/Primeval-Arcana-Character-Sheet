import {Character} from "./character";

export let CHLORR: Character = new Character({
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
  }]
});
