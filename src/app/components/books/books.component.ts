import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { BooksService } from '../../services/books.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DiscountPipe } from '../../pipes/discount.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AddToCartHighlightDirective } from '../../directives/add-to-cart.directive';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { MatDialog } from '@angular/material/dialog';
import { BookFormComponent } from '../book-form/book-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AsyncPipe } from '@angular/common';
import { DiscountBadgeDirective } from '../../directives/discount-badge.directive';
import { HoverScaleDirective } from '../../directives/hover-scale.directive';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    DiscountPipe,
    TruncatePipe,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    AddToCartHighlightDirective,
    TooltipDirective,
    MatFormField,
    DiscountBadgeDirective,
    HoverScaleDirective,
    MatLabel,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  authorSearch = '';
  books: Book[] = [];
  loading = true;
  authorSearchQuery = '';
  constructor(
    private cartService: CartService,
    private booksService: BooksService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.booksService.getBooks().subscribe(books => {
      this.books = books;
      this.loading = false;
    });
  }

  addToCart(book: Book): void {
    this.cartService.addToCart(book);
    this.snackBar.open(`${book.title} hozzáadva a kosárhoz.`, 'OK', { duration: 2000 });
  }

  refreshBooks(): void {
  this.loading = true;
  this.booksService.getBooks().subscribe(books => {
    this.books = books;
    this.loading = false;
  });
}
  loadDiscountedBooks() {
    this.booksService.getDiscountedBooks().subscribe(books => {
      this.books = books;
    });
  }

  loadMostExpensiveBooks() {
    this.booksService.getMostExpensiveBooks(3).subscribe(books => {
      this.books = books;
    });
  }


searchBooksByAuthor(): void {
  if (!this.authorSearchQuery.trim()) {
    this.refreshBooks();
    return;
  }

  this.loading = true;
  this.booksService.getBooksByAuthor(this.authorSearchQuery).subscribe({
    next: (books) => {
      this.books = books;
      this.loading = false;
    },
    error: (error) => {
      this.snackBar.open('Hiba történt a keresés során', 'OK', { duration: 3000 });
      this.loading = false;
    }
  });
}
openBookForm(book?: Book): void {
  const dialogRef = this.dialog.open(BookFormComponent, {
    width: '600px',
    data: { book: book || null }
  });

  dialogRef.componentInstance.submitForm.subscribe((formData: any) => {
    const bookToSave = book 
      ? { ...formData, id: book.id }
      : formData;

    const operation = book 
      ? this.booksService.updateBook(bookToSave as Book)
      : this.booksService.addBook(bookToSave as Omit<Book, 'id'>);

    operation.then(() => {
      this.refreshBooks();
      this.snackBar.open(`Könyv sikeresen ${book ? 'frissítve' : 'hozzáadva'}`, 'OK', { 
        duration: 3000 
      });
    }).catch(error => {
      console.error('Hiba:', error);
      this.snackBar.open(`Hiba történt: ${error.message}`, 'OK', { 
        duration: 5000 
      });
    });
    
    dialogRef.close();
  });
}

}
