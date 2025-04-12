import { Injectable } from '@angular/core';
import { Book } from '../models/book';
import { Cart, CartItem } from '../models/cart';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Cart = { items: [], total: 0 };

  constructor(private snackBar: MatSnackBar) {}

  addToCart(book: Book): void {
    const existingItem = this.cart.items.find(item => item.book.id === book.id);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.items.push({ book, quantity: 1 });
    }

    this.snackBar.open(`"${book.title}" hozzáadva a kosárhoz!`, 'Értem', { 
      duration: 2000,
      panelClass: 'success-snackbar' 
    });
    
    this.calculateTotal();
  }

  removeFromCart(bookId: number): void {
    const removedItem = this.cart.items.find(item => item.book.id === bookId);
    this.cart.items = this.cart.items.filter(item => item.book.id !== bookId);
    this.calculateTotal();

    if (removedItem) {
      this.snackBar.open(`"${removedItem.book.title}" eltávolítva a kosárból!`, 'Vissza', { 
        duration: 3000,
        panelClass: 'warn-snackbar' 
      });
    }
  }

  updateQuantity(bookId: number, quantity: number): void {
    const item = this.cart.items.find(item => item.book.id === bookId);
    if (item) {
      item.quantity = quantity;
      this.calculateTotal();
    }
  }

  getCart(): Cart {
    return this.cart;
  }

  clearCart(): void {
    this.cart = { items: [], total: 0 };
  }

  private calculateTotal(): void {
    this.cart.total = this.cart.items.reduce(
      (sum, item) => {
        const unitPrice = item.book.discount 
          ? item.book.price * (1 - item.book.discount / 100)
          : item.book.price;
        return sum + (unitPrice * item.quantity);
      }, 
      0
    );
  }
}