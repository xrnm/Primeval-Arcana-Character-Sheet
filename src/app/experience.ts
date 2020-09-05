export class Experience {
  date: Date;
  points: number;
  notes: string;

  constructor(init?: Partial<Experience>) {
    Object.assign(this, init);
  }
}
