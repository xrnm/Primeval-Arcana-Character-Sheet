import {Loadable} from "./loadable";
import {Item} from "./item";

export class Container implements Loadable{
  slots: number = 0;
  contents: Item[] = [];
  name: string;
  weight: number;
  load(){
    return this.contents.reduce((weight,item, index)=>{return weight + item.totalWeight()}, this.weight)
  }

  inventoryString(){
    return `${this.name} (${this.load()})`
  }

  constructor(init?:Partial<Container>) {
    Object.assign(this, init);
  }

}
