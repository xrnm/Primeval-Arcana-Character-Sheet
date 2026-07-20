import {Injectable} from '@angular/core';
import {BehaviorSubject, ReplaySubject} from 'rxjs';
import {AuthError, AuthResponse, Session, User, UserResponse} from '@supabase/supabase-js';
import {supabase} from '../persistence/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  session$ = new BehaviorSubject<Session | null>(null);
  // Fires when the user arrives via a password-recovery email link; ReplaySubject so a late
  // subscriber (the app is still bootstrapping when Supabase processes the URL) still gets it.
  recovery$ = new ReplaySubject<void>(1);
  private readyPromise: Promise<void>;

  constructor() {
    // Never let an auth/network hiccup block startup — anonymous users must always get through.
    this.readyPromise = supabase.auth.getSession()
      .then(({data}) => {
        this.setSession(data.session);
      })
      .catch(() => {
        this.session$.next(null);
      });
    supabase.auth.onAuthStateChange((event, session) => {
      this.setSession(session);
      if (event === 'PASSWORD_RECOVERY')
        this.recovery$.next();
    });
  }

  private setSession(session: Session | null){
    this.session$.next(session);
    // Remember that this device has used an account, so logging out prompts sign-in rather than
    // resurfacing a character.
    if (session)
      localStorage.setItem('odnd-has-account', '1');
  }

  ready(): Promise<void> {
    return this.readyPromise;
  }

  isAuthenticated(): boolean {
    return !!this.session$.value;
  }

  getUser(): User | null {
    return this.session$.value?.user || null;
  }

  signUp(email: string, password: string): Promise<AuthResponse> {
    return supabase.auth.signUp({email, password});
  }

  signIn(email: string, password: string): Promise<AuthResponse> {
    return supabase.auth.signInWithPassword({email, password});
  }

  signOut(): Promise<{error: unknown}> {
    return supabase.auth.signOut();
  }

  resetPassword(email: string): Promise<{error: AuthError | null}> {
    return supabase.auth.resetPasswordForEmail(email, {redirectTo: location.origin});
  }

  updatePassword(password: string): Promise<UserResponse> {
    return supabase.auth.updateUser({password});
  }
}
