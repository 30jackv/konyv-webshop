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
    DiscountPipe
],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent {
  constructor(public cartService: CartService, private dialog: MatDialog) {}

  onQuantityChange(bookId: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const quantity = parseInt(input.value);
    this.cartService.updateQuantity(bookId, quantity);
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
      }
    });
  }

  handleKeyDown(event: KeyboardEvent): boolean {
    const forbiddenKeys = ['e', 'E', '-', '+', '.', '_', ','];
    return !forbiddenKeys.includes(event.key);
  }
}



