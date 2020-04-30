import {Character} from "./character";
import {Purse} from "./purse";
import {Item} from "./item";
import {Container} from "./container";
import {Game} from "./game";

export let CHLORR: Game = new Game({
    character: new Character({
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
      base_movement: 60,
      current_hp: 6,
      total_hp: 7,
      armor_class: 7,
      helmet: true,
      shield: false,
      abilities: {
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
        gold: 150,
        silver: 3,
        copper: 9,
        gems: [new Item({name: 'Opal', quantity: 3, value: 11000, description: 'hi', weight: 3}), new Item({
          name: 'Ruby',
          quantity: 1,
          value: 120000,
          description: 'hi',
          weight: 3
        })],
      }),
      magic_items: [
        new Item({name: "Sword of fuck you", weight: 2})
      ],
      known_languages: ['Common', 'Dwarfish', 'Elven'],
      weapons: [new Item({name: 'Long Bow', weight: 60}), new Item({name: 'Dagger', weight: 20})],
      armor: [new Item({name: 'Plate Mail', weight: 550}), new Item({name: 'Helmet', weight: 50})],
      slung_items: [new Container({
        name: 'Backpack', weight: 75, slots: 10,
        contents: [new Item({name: 'Cheese', weight: 50}), new Item({quantity: 5, name: 'Torches', weight: 20})]
      },), new Container({
        name: 'Quiver',
        weight: 10,
        slots: 1,
        contents: [new Item({quantity: 20, name: 'Arrows', weight: 2})]
      }),
        new Container({
          name: 'Quiver',
          weight: 10,
          slots: 1,
          contents: [new Item({quantity: 20, name: 'Arrows', weight: 2})]
        })],
      appearance: 'Chlorr is bald and her face is full of scars.',
      clothing: "Chlorr is wearing plate and some pink fuzzy boots",
      quests: "Helping Le Brom with his sick cows by clearing out the Picard Mill"
    }),
    sessions: [],
    notes: [{
      name: 'Places of Interest',
      content: 'Coldwater is a cool town with cool stuff okay?'
    }, {name: 'People of Interest', content: 'Coldwater is a cool town with cool stuff okay?'}]
  })
;
