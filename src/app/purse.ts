import {Item} from "./item";
import {Loadable} from "./loadable";

export class Purse implements Loadable{
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
  gems: Item[];

  getTotal(){
    return `${this.platinum * 100 + this.gold}G ${this.silver}S ${this.copper}C`
  }

  constructor(init?:Partial<Purse>) {
    Object.assign(this, init);
  }

  load(){
    return this.platinum + this.gold + this.silver + this.copper + this.gems.reduce((acc,item)=>acc+item.weight,0)
  }
}
