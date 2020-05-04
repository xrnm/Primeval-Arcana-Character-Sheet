export class Note {
  name: string;
  content: string;

  constructor(init?:Partial<Note>) {
    Object.assign(this, init);
  }
}
