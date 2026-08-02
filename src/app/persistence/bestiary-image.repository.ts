import {Injectable} from '@angular/core';
import {supabase} from './supabase.client';
import {AuthService} from '../auth/auth.service';

const BUCKET = 'bestiary';
const MAXIMUM_BYTES = 5 * 1024 * 1024;

@Injectable({
  providedIn: 'root'
})
export class BestiaryImageRepository {

  constructor(private authService: AuthService) {}

  canUpload(): boolean {
    return this.authService.isAuthenticated();
  }

  maximumBytes(): number {
    return MAXIMUM_BYTES;
  }

  // Objects live under the owner's user id because the storage policies key on that first path
  // segment; the campaign segment just keeps a project's images together.
  async upload(file: File, campaignId: string): Promise<string> {
    const user = this.authService.getUser();
    if (!user)
      throw new Error('Sign in to add an image');
    if (!file.type.startsWith('image/'))
      throw new Error('That file is not an image');
    if (file.size > MAXIMUM_BYTES)
      throw new Error('Images must be under 5MB');

    const extension = (file.name.split('.').pop() || 'img').toLowerCase().replace(/[^a-z0-9]/g, '');
    const path = `${user.id}/${campaignId || 'local'}/${crypto.randomUUID()}.${extension}`;
    const {error} = await supabase.storage.from(BUCKET).upload(path, file, {contentType: file.type});
    if (error)
      throw error;
    return path;
  }

  async remove(path: string): Promise<void> {
    if (!path)
      return;
    await supabase.storage.from(BUCKET).remove([path]);
  }

  publicUrl(path: string): string {
    if (!path)
      return '';
    return supabase.storage.from(BUCKET).getPublicUrl(path).data.publicUrl;
  }
}
