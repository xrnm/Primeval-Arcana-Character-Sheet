import {inject} from '@angular/core';
import {CanMatchFn} from '@angular/router';
import {AuthService} from './auth.service';
import {AppModeHelper} from '../app-mode-helper';

// Matches the roster route only on the canonical origin for an authenticated user. Awaits the
// initial session restore so a logged-in user isn't bounced to the anonymous home on refresh.
export const accountGuard: CanMatchFn = async () => {
  if (!AppModeHelper.isCanonicalOrigin())
    return false;
  const authService = inject(AuthService);
  await authService.ready();
  return authService.isAuthenticated();
};
