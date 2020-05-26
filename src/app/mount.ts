import {Container} from "./container";
import {Item} from "./item";

export class Mount {
  name: string;
  morale: number;
  current_hp: number;
  total_hp: number ;
  hit_dice: number;
  armor_class: number;
  max_carry: number;
  max_pull: number;
  base_movement: number;
  alignment: string;
  species: string;
  barding: boolean;
  intelligence: number;
  inventory: Item[];
  slung_items: Container[];
  deleted: boolean = false;

  constructor(init?: Partial<Mount>) {
    Object.assign(this, init);
    this.inventory = init.inventory.map(item => new Item(item));
    this.slung_items = init.slung_items.map(container => new Container(container));
  }
  bardingText(){
    return this.barding ? 'Yes' : 'No';
  }
}
