import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../models/cart';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DiscountPipe } from "../../pipes/discount.pipe";
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
    DiscountPipe,
    MatTooltipModule
  ],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  constructor(
    public cartService: CartService, 
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

onQuantityChange(bookId: string, event: Event): void {
  const input = event.target as HTMLInputElement;
  const quantity = parseInt(input.value);
  if (isNaN(quantity) || quantity < 1) {
    input.value = '1';
    this.cartService.updateQuantity(bookId, 1);
  } else {
    this.cartService.updateQuantity(bookId, quantity);
  }
}

increaseQuantity(bookId: string): void {
  const item = this.cartService.getCart().items.find((item: CartItem) => item.book.id === bookId);
  if (item) {
    this.cartService.updateQuantity(bookId, item.quantity + 1);
  }
}

decreaseQuantity(bookId: string): void {
  const item = this.cartService.getCart().items.find((item: CartItem) => item.book.id === bookId);
  if (item && item.quantity > 1) {
    this.cartService.updateQuantity(bookId, item.quantity - 1);
  }
}


  getItemTotal(item: CartItem): number {
    if (item.book.discount) {
      return item.book.price * (1 - item.book.discount/100) * item.quantity;
    }
    return item.book.price * item.quantity;
  }

  clearCart(): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { 
        title: 'Kosár ürítése', 
        message: 'Biztosan törli az összes elemet a kosárból?' 
      }
    });
  
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.cartService.clearCart();
        this.snackBar.open('A kosár kiürítve', 'OK', { duration: 3000 });
      }
    });
  }

  async checkout(): Promise<void> {
    if (!this.authService.isLoggedIn()) {
      this.snackBar.open('A vásárláshoz be kell jelentkeznie', 'OK', { duration: 3000 });
      return;
    }

    try {
      await this.cartService.checkout();
      this.snackBar.open('A rendelését sikeresen rögzítettük', 'OK', { duration: 3000 });
    } catch (error: any) {
      this.snackBar.open(error.message || 'Hiba történt a fizetés során', 'OK', { duration: 3000 });
    }
  }

  handleKeyDown(event: KeyboardEvent): boolean {
    const forbiddenKeys = ['e', 'E', '-', '+', '.', '_', ','];
    return !forbiddenKeys.includes(event.key);
  }
}