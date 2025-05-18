import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: any = { items: [], total: 0 };

  constructor(private firebaseService: FirebaseService) {}

  getCart() {
    return this.cart;
  }

addToCart(book: any) {
  const existingItem = this.cart.items.find((item: any) => item.book.id === book.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    this.cart.items.push({ book, quantity: 1 });
  }
  this.calculateTotal();
}

updateQuantity(bookId: string, quantity: number): void {
  const item = this.cart.items.find((item: any) => item.book.id === bookId);
  if (item) {
    if (quantity <= 0) {
      this.removeFromCart(bookId.toString());
    } else {
      item.quantity = quantity;
      this.calculateTotal();
    }
  }
}

removeFromCart(bookId: string) {
  this.cart.items = this.cart.items.filter((item: any) => item.book.id !== bookId);
  this.calculateTotal();
}
 

private calculateTotal() {
  this.cart.total = this.cart.items.reduce((sum: number, item: any) => {
    const price = item.book.discount
      ? item.book.price * (1 - item.book.discount / 100)
      : item.book.price;
    return sum + (price * item.quantity);
  }, 0);
}


  async checkout() {
    const user = this.firebaseService.getCurrentUser();
    if (!user) {
      throw new Error('User must be logged in');
    }

    if (this.cart.items.length === 0) {
      throw new Error('Cart is empty');
    }

    try {
      const order = {
        userId: user.uid,
        userEmail: user.email,
        items: this.cart.items,
        total: this.cart.total
      };

      await this.firebaseService.addOrder(order);
      this.clearCart();
      return true;
    } catch (error) {
      console.error('Checkout error:', error);
      throw error;
    }
  }

  clearCart() {
    this.cart = { items: [], total: 0 };
  }
}