import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatError
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService) {}

  async onSignIn() {
    if (!this.email || !this.password) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      await this.authService.signIn(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  async onSignUp() {
    if (!this.email || !this.password) return;
    
    this.isLoading = true;
    this.errorMessage = '';
    
    try {
      await this.authService.signUp(this.email, this.password);
    } catch (error: any) {
      this.errorMessage = this.getErrorMessage(error);
    } finally {
      this.isLoading = false;
    }
  }

  private getErrorMessage(error: any): string {
    const errorCode = error.code;
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Nincs ilyen felhasználó regisztrálva.';
      case 'auth/wrong-password':
        return 'Helytelen jelszó.';
      case 'auth/email-already-in-use':
        return 'Ez az email cím már használatban van.';
      case 'auth/weak-password':
        return 'A jelszó túl gyenge (legalább 6 karakter).';
      case 'auth/invalid-email':
        return 'Érvénytelen email cím.';
      default:
        return 'Ismeretlen hiba történt. Kérjük próbálja újra később.';
    }
  }
}