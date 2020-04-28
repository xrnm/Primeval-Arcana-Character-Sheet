export class Item {
  weight: number = 0;
  value: number;
  name: string;
  quantity: number = 1;
  description: string;

  constructor(init?:Partial<Item>) {
    Object.assign(this, init);
  }

  totalWeight(){
    return this.weight * this.quantity
  }

  inventoryString(){
    return `${this.quantity > 0 ? this.quantity : ''} ${this.name} (${this.weight*this.quantity}cn)`
  }
}
