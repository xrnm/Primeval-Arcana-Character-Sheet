import {Character} from "./character";

export let NEW_CHARACTER = new Character({
    name: 'New Fighter',
    race: 'Human',
    base_movement: 60,
    current_hp: 7,
    total_hp: 7,
    armor_class: 9,
    known_languages: ['Common'],
    abilities:{
      strength: 10,
      intelligence: 10,
      wisdom: 10,
      dexterity: 10,
      constitution: 10,
      charisma: 10
    },
    saving_throws: {
      system_shock: 3,
      poison: 14,
      paralysis: 15,
      petrification: 16,
      dragon_breath: 17,
      spell: 18
    },
  });

