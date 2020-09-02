export class Experience {
  date: Date;
  points: number;
  notes: string;
  multiclass_description: string

  constructor(init?: Partial<Experience>) {
    Object.assign(this, init);
  }
}
