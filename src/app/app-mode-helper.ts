export class AppModeHelper {
  // Any *.ics.blacktowergames.com host is a legacy per-character subdomain; the bare canonical
  // host (and localhost) is the account origin. The leading dot is required so the canonical
  // "ics.blacktowergames.com" is NOT treated as a subdomain.
  static isLegacySubdomain(): boolean {
    return /\.ics\.blacktowergames\.com$/i.test(location.hostname);
  }

  static isCanonicalOrigin(): boolean {
    return !AppModeHelper.isLegacySubdomain();
  }

  static subdomainLabel(): string {
    const match = location.hostname.match(/^([^.]+)\.ics\.blacktowergames\.com$/i);
    return match ? match[1].toLowerCase() : '';
  }

  static slug(value: string): string {
    return (value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }
}
