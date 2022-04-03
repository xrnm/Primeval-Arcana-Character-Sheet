export class Spell {
  level: number;
  name: string;
  description: string;
  reversible: boolean = false

  constructor(init?: Partial<Spell>) {
    Object.assign(this, init);
  }
}
