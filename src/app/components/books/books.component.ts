import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddToCartHighlightDirective } from '../../directives/add-to-cart.directive';
@Component({
  selector: 'app-books',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    DiscountPipe,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AddToCartHighlightDirective
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent {
  constructor(private cartService: CartService) { }

  books: Book[] = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'John Doe',
      price: 3990,
      discount: 10
    },
    {
      id: 2,
      title: 'Ulysses',
      author: 'Jane Doe',
      price: 4990,
    },
    {
      id: 3,
      title: '1984',
      author: 'Roe Doe',
      price: 5990
    }
  ];

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
  }

}

