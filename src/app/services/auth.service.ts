import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user$: Observable<any>;
  public currentUser$: Observable<any>;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.user$ = this.firebaseService.user$;
    this.currentUser$ = this.firebaseService.user$;
  }

  async signIn(email: string, password: string) {
    try {
      await this.firebaseService.signIn(email, password);
      this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  }

  async signUp(email: string, password: string) {
    try {
      await this.firebaseService.signUp(email, password);
      this.router.navigate(['/']);
      return true;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      await this.firebaseService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }

  async logout() {
    return this.signOut();
  }

  isLoggedIn(): boolean {
    return this.firebaseService.getCurrentUser() !== null;
  }
}