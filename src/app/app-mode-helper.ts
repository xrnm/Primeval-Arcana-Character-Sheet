export class AppModeHelper {
  // Turn a character/campaign name into a URL-friendly slug.
  static slug(value: string): string {
    return (value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}
