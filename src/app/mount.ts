import {Container} from "./container";
import {Item} from "./item";
import {Loadable} from "./loadable";

export class Mount implements Loadable{
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
  saddle: boolean;
  intelligence: number;
  inventory: Item[];
  slung_items: Container[];
  deleted: boolean = false;

  constructor(init?: Partial<Mount>) {
    Object.assign(this, init);
    this.inventory = init.inventory.map(item => new Item(item));
    this.slung_items = init.slung_items.map(container => new Container(container));
  }

  getDescription(){
    let description = this.species;
    if(this.saddle)
      description = 'Saddeled ' + description;
    if(this.barding)
      description += ' with barding';
    return description
  }

  getSlungItems(){
    return this.slung_items.filter(si=>!si.deleted);
  }

  load() {
    if (this.deleted)
      return 0;

    return this.inventory.reduce((weight, item, index) => {
      return weight + item.totalWeight()
    }, this.getSlungItems().reduce((weight,item,index)=>{
      return weight + item.load();
    },0));
  }


}
