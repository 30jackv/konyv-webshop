import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users: User[] = [
    { id: '1', username: 'admin', password: 'admin123' },
    { id: '2', username: 'user', password: 'user123' }
  ];

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  login(username: string, password: string): boolean {
    const user = this.users.find(u => 
      u.username === username && u.password === password
    );
    if (user) {
      this.currentUserSubject.next(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}