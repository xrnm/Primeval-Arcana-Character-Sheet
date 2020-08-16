export class Item {
  weight: number = 0;
  value: number;
  name: string;
  quantity: number = 1;
  description: string;
  deleted: boolean = false;
  unequipped: boolean;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }

  totalWeight() {
    if(this.deleted || this.unequipped) return 0;
    return this.weight * this.quantity
  }

  inventoryString() {
    if(!this.name)
      return "New Item";
    return `${this.quantity > -1 ? this.quantity : ''} ${this.name} (${this.weight * this.quantity}cn)`
  }

  consume(event) {
    let magnitude = 1;

    if(event.shiftKey)
      magnitude *= 10;

    if(event.ctrlKey || event.metaKey)
      magnitude *= 100;

    this.quantity -= magnitude;

    // Disallow negative purse values
    if(this.quantity < 0)
      this.quantity = 0;
  }

  collect(event) {
    let magnitude = 1;

    if(event.shiftKey)
      magnitude *= 10;

    if(event.ctrlKey || event.metaKey)
      magnitude *= 100;

    this.quantity += magnitude;
  }

  delete() {
    if(confirm("Are you sure you want to delete "+this.inventoryString())) {
      this.deleted = true
    }
  }
}
