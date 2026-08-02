import {Component, ChangeDetectionStrategy} from '@angular/core';
import {MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: ['./auth-dialog.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormField, MatLabel, MatInput, MatButton, FormsModule]
})
export class AuthDialogComponent {
  mode: 'signin' | 'signup' | 'reset' = 'signin';
  email: string = '';
  password: string = '';
  error: string = '';
  notice: string = '';
  busy: boolean = false;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<AuthDialogComponent>) {}

  toggleMode(){
    this.mode = this.mode === 'signin' ? 'signup' : 'signin';
    this.error = '';
    this.notice = '';
  }

  forgotPassword(){
    this.mode = 'reset';
    this.error = '';
    this.notice = '';
  }

  backToSignIn(){
    this.mode = 'signin';
    this.error = '';
    this.notice = '';
  }

  async submit(){
    this.error = '';
    this.notice = '';
    this.busy = true;
    try {
      if (this.mode === 'reset') {
        const {error} = await this.authService.resetPassword(this.email);
        if (error) {
          this.error = error.message;
          return;
        }
        this.notice = 'Check your email for a password reset link.';
        return;
      }
      if (this.mode === 'signin') {
        const {error} = await this.authService.signIn(this.email, this.password);
        if (error) {
          this.error = error.message;
          return;
        }
        this.dialogRef.close(true);
      } else {
        const {data, error} = await this.authService.signUp(this.email, this.password);
        if (error) {
          this.error = error.message;
          return;
        }
        // With email confirmation enabled Supabase returns no session until the link is clicked.
        // Send them to sign-in with their email prefilled (and a clear password field).
        if (!data.session) {
          this.mode = 'signin';
          this.password = '';
          this.notice = 'Account created — check your email to confirm, then sign in.';
          return;
        }
        this.dialogRef.close(true);
      }
    } finally {
      this.busy = false;
    }
  }
}
