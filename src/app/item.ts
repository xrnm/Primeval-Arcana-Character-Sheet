export class Item {
  weight: number = 0;
  value: number;
  name: string;
  quantity: number = 1;
  description: string;
  deleted: boolean = false;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }

  totalWeight() {
    if(this.deleted) return 0;
    return this.weight * this.quantity
  }

  inventoryString() {
    if(!this.name)
      return "New Item";
    return `${this.quantity > 0 ? this.quantity : ''} ${this.name} (${this.weight * this.quantity}cn)`
  }

  consume() {
    this.quantity -= 1;
  }

  collect() {
    this.quantity += 1;
  }

  delete() {
    if(confirm("Are you sure you want to delete "+this.inventoryString())) {
      this.deleted = true
    }
  }
}
