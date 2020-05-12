export class Spell {
  level: number;
  name: string;
  description: string;

  constructor(init?: Partial<Spell>) {
    Object.assign(this, init);
  }
}
