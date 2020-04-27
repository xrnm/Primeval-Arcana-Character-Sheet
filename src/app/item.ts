export class Item {
  weight: number;
  value: number;
  name: string;
  quantity: number;
  description: string

  public constructor(init?:Partial<Item>) {
    Object.assign(this, init);
  }
}
