import {Item} from "./item";
import {Loadable} from "./loadable";

export class Purse implements Loadable{
  platinum: number = 0;
  gold: number = 0;
  silver: number = 0;
  copper: number = 0;
  gems: Item[] = [];

  getTotal(){
    return `${this.platinum * 10 + this.gold}G ${this.silver}S ${this.copper}C`
  }

  constructor(init?:Partial<Purse>) {
    if(!init) return;
    Object.assign(this, init);
    this.gems = init.gems.map(gem=>new Item(gem));
  }

  load(){
    return this.platinum + this.gold + this.silver + this.copper + this.gems.reduce((acc,item)=>acc+item.weight,0)
  }
}
