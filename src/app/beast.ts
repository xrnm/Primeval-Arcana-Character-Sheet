export class Beast {
  name: string;
  description: string;
  armor_class: number;
  hit_dice: number;
  hit_points: number;
  movement_rating: number;
  // Storage object path, not a URL. The public URL is derived at render time so a bucket or project
  // move doesn't strand every image saved in the blob.
  image_path?: string;

  constructor(init?: Partial<Beast>) {
    Object.assign(this, init);
  }
}
