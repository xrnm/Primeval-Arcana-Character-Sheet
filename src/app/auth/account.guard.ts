import {inject} from '@angular/core';
import {CanMatchFn} from '@angular/router';
import {AuthService} from './auth.service';

// The account routes (roster, campaign pages) are available on every origin — including the legacy
// wildcard subdomains. Awaits the initial session restore so a logged-in user isn't bounced to the
// anonymous home on refresh.
export const accountGuard: CanMatchFn = async () => {
  const authService = inject(AuthService);
  await authService.ready();
  return authService.isAuthenticated();
};
