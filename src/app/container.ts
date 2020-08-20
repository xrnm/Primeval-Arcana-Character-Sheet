import {Loadable} from "./loadable";
import {Item} from "./item";

export class Container implements Loadable {
  slots: number = 0;
  contents: Item[] = [];
  name: string;
  weight: number;
  capacity: number;
  unequipped: boolean
  deleted: boolean = false;

  isOverfull(){
    return this.contentsWeight() > this.capacity
  }
  load() {
    if (this.deleted || this.unequipped)
      return 0;

    return this.contentsWeight() + this.weight
  }

  contentsWeight(){
    return this.contents.reduce((weight, item, index) => {
      return weight + item.totalWeight()
    },0)
  }

  inventoryString(includeWeight=true) {
    if(includeWeight)
      return `${this.name} (${this.load()}cn)`;
    else
      return `${this.name}`;
  }

  capacityString() {
    if(!this.capacity)
      return `${this.load()}cn`;
    return `${this.contentsWeight()}/${this.capacity}cn (${((this.contentsWeight() / this.capacity)*100).toFixed(0)}%)`;
  }

  constructor(init?: Partial<Container>) {
    Object.assign(this, init);
    this.contents = init.contents.map(item => new Item(item));
  }

  delete() {
    if (confirm("Are you sure you want to delete " + this.inventoryString())) {
      this.deleted = true
    }
  }

}
