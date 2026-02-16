import equipmentData from '../assets/equipment.json';

export interface EquipmentItem {
  name: string;
  category: string;
  price: number;
  weight: number;
  sold_in: number;
  description: string;
  ac?: number;
  shield?: boolean;
  helmet?: boolean;
  slingable?: boolean;
}

export interface LoadoutItem {
  name: string;
  quantity: number;
}

export interface LoadoutDefinition {
  name: string;
  scenario: string;
  weightClass: string;
  totalCost: number;
  backpackItems: LoadoutItem[];
  slungItems: LoadoutItem[];
}

export class EquipmentLoadoutHelper {
  static readonly LOADOUTS: LoadoutDefinition[] = [
    // Structure Exploration
    {
      name: 'Structure Exploration - Light',
      scenario: 'Structure Exploration',
      weightClass: 'Light',
      totalCost: 7510,
      backpackItems: [
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Oil Flask', quantity: 1},
        {name: 'Rope, Silk', quantity: 1},
        {name: 'Paper', quantity: 1},
        {name: 'Charcoal / Chalk Rod', quantity: 1},
        {name: 'Sack, Small', quantity: 1},
        {name: 'Holy Water', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Candle', quantity: 1},
        {name: 'Twine', quantity: 1},
        {name: 'Rations, Standard', quantity: 7},
        {name: 'Dungeoneer\'s Pole', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 1},
      ]
    },
    {
      name: 'Structure Exploration - Medium',
      scenario: 'Structure Exploration',
      weightClass: 'Medium',
      totalCost: 8800,
      backpackItems: [
        {name: 'Torches', quantity: 6},
        {name: 'Oil Flask', quantity: 1},
        {name: 'Rope', quantity: 1},
        {name: 'Grappling Hook', quantity: 1},
        {name: 'Spikes', quantity: 10},
        {name: 'Mallet', quantity: 1},
        {name: 'Rations, Standard', quantity: 7},
        {name: 'Journal', quantity: 1},
        {name: 'Pencil', quantity: 1},
        {name: 'Charcoal / Chalk Rod', quantity: 1},
        {name: 'Sack, Large', quantity: 1},
        {name: 'Sack, Small', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Blanket', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 1},
      ]
    },
    {
      name: 'Structure Exploration - Heavy',
      scenario: 'Structure Exploration',
      weightClass: 'Heavy',
      totalCost: 8400,
      backpackItems: [
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Torches', quantity: 6},
        {name: 'Oil Flask', quantity: 3},
        {name: 'Rope', quantity: 2},
        {name: 'Paper', quantity: 1},
        {name: 'Charcoal / Chalk Rod', quantity: 1},
        {name: 'Sack, Large', quantity: 1},
        {name: 'Sack, Small', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Rations, Iron', quantity: 7},
        {name: 'Blanket', quantity: 1},
        {name: 'Dungeoneer\'s Plank', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 2},
        {name: 'Climbing Kit', quantity: 1},
      ]
    },
    // Wilderness Survival
    {
      name: 'Wilderness Survival - Light',
      scenario: 'Wilderness Survival',
      weightClass: 'Light',
      totalCost: 5350,
      backpackItems: [
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Oil Flask', quantity: 1},
        {name: 'Rope, Silk', quantity: 1},
        {name: 'Sack, Large', quantity: 1},
        {name: 'Sack, Small', quantity: 2},
        {name: 'Salt, Fine', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Rations, Standard', quantity: 7},
        {name: 'Blanket', quantity: 1},
        {name: 'Spade', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 2},
      ]
    },
    {
      name: 'Wilderness Survival - Medium',
      scenario: 'Wilderness Survival',
      weightClass: 'Medium',
      totalCost: 5850,
      backpackItems: [
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Oil Flask', quantity: 2},
        {name: 'Rope', quantity: 1},
        {name: 'Spikes', quantity: 10},
        {name: 'Hammer', quantity: 1},
        {name: 'Sack, Large', quantity: 2},
        {name: 'Sack, Small', quantity: 1},
        {name: 'Salt, Fine', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Rations, Standard', quantity: 7},
        {name: 'Twine', quantity: 1},
        {name: 'Bed Roll', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 2},
        {name: 'Fishing Kit', quantity: 1},
      ]
    },
    {
      name: 'Wilderness Survival - Heavy',
      scenario: 'Wilderness Survival',
      weightClass: 'Heavy',
      totalCost: 7850,
      backpackItems: [
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Oil Flask', quantity: 3},
        {name: 'Rations, Iron', quantity: 7},
        {name: 'Rope', quantity: 3},
        {name: 'Sack, Large', quantity: 2},
        {name: 'Sewing Kit', quantity: 1},
        {name: 'Salt, Fine', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Grappling Hook', quantity: 1},
        {name: 'Blanket', quantity: 1},
        {name: 'Tent, Small', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 3},
        {name: 'Cooking Kit', quantity: 1},
      ]
    },
    // Dungeoneering
    {
      name: 'Dungeoneering - Light',
      scenario: 'Dungeoneering',
      weightClass: 'Light',
      totalCost: 7410,
      backpackItems: [
        {name: 'Torches', quantity: 6},
        {name: 'Oil Flask', quantity: 3},
        {name: 'Sack, Large', quantity: 2},
        {name: 'Mirror, Silvered', quantity: 1},
        {name: 'Charcoal / Chalk Rod', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Candle', quantity: 1},
        {name: 'Rope, Silk', quantity: 1},
        {name: 'Rations, Standard', quantity: 7},
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Blanket', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 1},
        {name: 'Salt, Coarse', quantity: 1},
        {name: 'Dungeoneer\'s Pole', quantity: 1},
      ]
    },
    {
      name: 'Dungeoneering - Medium',
      scenario: 'Dungeoneering',
      weightClass: 'Medium',
      totalCost: 11700,
      backpackItems: [
        {name: 'Rope', quantity: 2},
        {name: 'Oil Flask', quantity: 2},
        {name: 'Mallet', quantity: 1},
        {name: 'Spikes', quantity: 10},
        {name: 'Locksmith Kit', quantity: 1},
        {name: 'Paper', quantity: 1},
        {name: 'Pencil', quantity: 1},
        {name: 'Sack, Large', quantity: 1},
        {name: 'Mirror, Silvered', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Rations, Standard', quantity: 7},
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Blanket', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 2},
        {name: 'Dungeoneer\'s Plank', quantity: 1},
      ]
    },
    {
      name: 'Dungeoneering - Heavy',
      scenario: 'Dungeoneering',
      weightClass: 'Heavy',
      totalCost: 13400,
      backpackItems: [
        {name: 'Oil Flask', quantity: 4},
        {name: 'Sack, Large', quantity: 2},
        {name: 'Sewing Kit', quantity: 1},
        {name: 'Charcoal / Chalk Rod', quantity: 1},
        {name: 'Tinderbox', quantity: 1},
        {name: 'Rope, Silk', quantity: 4},
        {name: 'Grappling Hook', quantity: 1},
        {name: 'Rations, Iron', quantity: 7},
        {name: 'Lamp / Lantern', quantity: 1},
        {name: 'Blanket', quantity: 1},
      ],
      slungItems: [
        {name: 'Waterskin / Wineskin', quantity: 2},
        {name: 'Salt, Coarse', quantity: 1},
        {name: 'Dungeoneer Kit', quantity: 1},
      ]
    },
  ];

  static getLoadouts(): LoadoutDefinition[] {
    return EquipmentLoadoutHelper.LOADOUTS;
  }

  static getEquipmentCatalog(): EquipmentItem[] {
    return equipmentData as EquipmentItem[];
  }

  static getWeapons(): EquipmentItem[] {
    return EquipmentLoadoutHelper.getEquipmentCatalog().filter(i => i.category === 'Weapons');
  }

  static getArmor(): EquipmentItem[] {
    return EquipmentLoadoutHelper.getEquipmentCatalog().filter(i => i.category === 'Armor');
  }

  static findItem(name: string): EquipmentItem {
    return EquipmentLoadoutHelper.getEquipmentCatalog().find(i => i.name === name);
  }

  static priceInGold(copperPrice: number): number {
    return copperPrice / 100;
  }

  static loadoutWeight(loadout: LoadoutDefinition): number {
    const backpack = EquipmentLoadoutHelper.findItem('Backpack');
    const backpackContentsWeight = loadout.backpackItems.reduce((sum, li) => {
      const item = EquipmentLoadoutHelper.findItem(li.name);
      return sum + (item ? item.weight * li.quantity : 0);
    }, 0);
    const slungWeight = loadout.slungItems.reduce((sum, li) => {
      const item = EquipmentLoadoutHelper.findItem(li.name);
      return sum + (item ? item.weight * li.quantity : 0);
    }, 0);
    return backpack.weight + backpackContentsWeight + slungWeight;
  }
}
