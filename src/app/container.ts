import {Loadable} from "./loadable";
import {Item} from "./item";

export class Container implements Loadable {
  slots: number = 0;
  contents: Item[] = [];
  name: string;
  weight: number;
  capacity: number;
  deleted: boolean = false;

  load() {
    if (this.deleted)
      return 0;
    return this.contents.reduce((weight, item, index) => {
      return weight + item.totalWeight()
    }, this.weight)
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
    return `${this.load()-this.weight}/${this.capacity}cn (${(((this.load() - this.weight) / this.capacity)*100).toFixed(0)}%)`;
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
