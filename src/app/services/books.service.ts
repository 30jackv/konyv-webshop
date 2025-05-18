import { Injectable } from '@angular/core';
import { 
  Firestore, 
  collection, 
  collectionData, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  getDocs
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  constructor(private firestore: Firestore) {}

  private get booksCollection() {
    return collection(this.firestore, 'books');
  }

  getBooks(): Observable<Book[]> {
    return collectionData(this.booksCollection, { idField: 'id' }) as Observable<Book[]>;
  }

  getDiscountedBooks(): Observable<Book[]> {
    const q = query(
      this.booksCollection,
      where('discount', '>', 0),
      orderBy('discount', 'desc')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Book[]>;
  }

  getMostExpensiveBooks(limitCount: number = 5): Observable<Book[]> {
    const q = query(
      this.booksCollection,
      orderBy('price', 'desc'),
      limit(limitCount)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Book[]>;
  }

  getBooksByAuthor(authorName: string): Observable<Book[]> {
    const q = query(
      this.booksCollection,
      where('author', '==', authorName),
      orderBy('title')
    );
    return collectionData(q, { idField: 'id' }) as Observable<Book[]>;
  }

  searchBooksByTitle(titleQuery: string, limitCount: number = 10): Observable<Book[]> {
    const q = query(
      this.booksCollection,
      where('title', '>=', titleQuery),
      where('title', '<=', titleQuery + '\uf8ff'),
      limit(limitCount)
    );
    return collectionData(q, { idField: 'id' }) as Observable<Book[]>;
  }

  async addBook(book: Omit<Book, 'id'>): Promise<void> {
    await addDoc(this.booksCollection, book);
  }

  async updateBook(book: Book): Promise<void> {
    const bookDoc = doc(this.firestore, `books/${book.id}`);
    await updateDoc(bookDoc, { ...book });
  }

  async deleteBook(bookId: string): Promise<void> {
    const bookDoc = doc(this.firestore, `books/${bookId}`);
    await deleteDoc(bookDoc);
  }
}