export class DefaultSettingsHelper {
  public static character(){
    return {
      name: 'New Fighter',
      race: 'Human',
      base_movement: 60,
      current_hp: 7,
      total_hp: 7,
      armor_class: 9,
      known_languages: ['Common'],
      abilities: {
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
    }
  };
  public static mount(){
    return {
      name: 'New Animal Asset',
      morale: 7,
      current_hp: 7,
      total_hp: 7,
      hit_dice: 2,
      armor_class: 7,
      max_carry:15000,
      max_pull: 15000,
      base_movement: 120,
      alignment: 'Neutral',
      species: 'Horse',
      barding: false,
      intelligence: 2,
      inventory: [],
      slung_items: []
    }
  }

}
