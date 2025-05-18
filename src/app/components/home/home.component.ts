import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TruncatePipe } from '../../pipes/truncate.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    DiscountPipe,
    TruncatePipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  discountedBooks: Book[] = [];
  totalBooks: number = 0;

  constructor(
    private booksService: BooksService,
    private cartService: CartService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadDiscountedBooks();
    this.loadTotalBooks();
  }

  loadDiscountedBooks() {
    this.booksService.getDiscountedBooks().subscribe(books => {
      this.discountedBooks = books.slice(0, 4);
    });
  }

  loadTotalBooks() {
    this.booksService.getBooks().subscribe(books => {
      this.totalBooks = books.length;
    });
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book);
    this.snackBar.open(`${book.title} hozzáadva a kosárhoz`, 'OK', {
      duration: 2000,
      panelClass: ['success-snackbar']
    });
  }
}