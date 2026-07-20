export class Note {
  name: string;
  content: string;
  source?: string;

  constructor(init?:Partial<Note>) {
    Object.assign(this, init);
  }
}
