import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose} from '@angular/material/dialog';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {AuthService} from './auth.service';

export interface SetPasswordDialogData {
  title: string;
}

@Component({
    selector: 'app-set-password-dialog',
    templateUrl: './set-password-dialog.component.html',
    styleUrls: ['./auth-dialog.component.sass'],
    imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MatFormField, MatLabel, MatInput, MatButton, FormsModule]
})
export class SetPasswordDialogComponent {
  password: string = '';
  confirm: string = '';
  error: string = '';
  busy: boolean = false;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<SetPasswordDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: SetPasswordDialogData) {}

  async submit(){
    this.error = '';
    if (this.password.length < 6) {
      this.error = 'Password must be at least 6 characters.';
      return;
    }
    if (this.password !== this.confirm) {
      this.error = 'Passwords do not match.';
      return;
    }
    this.busy = true;
    try {
      const {error} = await this.authService.updatePassword(this.password);
      if (error) {
        this.error = error.message;
        return;
      }
      this.dialogRef.close(true);
    } finally {
      this.busy = false;
    }
  }
}
