import {Item} from "./item";

export class Purse {
  platinum: number;
  gold: number;
  silver: number;
  copper: number;
  gems: Item[];

  getTotal(){
    return this.platinum * 100 + this.gold + this.silver / 100 + this.copper / 1000
  }

  constructor(init?:Partial<Purse>) {
    Object.assign(this, init);
  }
}
