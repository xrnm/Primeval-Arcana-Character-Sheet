export class Session {
  date: Date;
  game_date: string;
  notes: string;

  constructor(init?: Partial<Session>) {
    Object.assign(this, init);
  }
}
