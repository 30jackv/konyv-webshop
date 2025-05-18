import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc
} from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  private firestore = getFirestore(this.app);
  
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  async signIn(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async signUp(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async signOut() {
    return await signOut(this.auth);
  }

  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }

  async getBooks() {
    const booksCollection = collection(this.firestore, 'books');
    const booksSnapshot = await getDocs(booksCollection);
    return booksSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  }

  async addBook(book: any) {
    const booksCollection = collection(this.firestore, 'books');
    return await addDoc(booksCollection, book);
  }

  

  async addOrder(order: any) {
    const ordersCollection = collection(this.firestore, 'orders');
    return await addDoc(ordersCollection, {
      ...order,
      createdAt: new Date()
    });
  }
}