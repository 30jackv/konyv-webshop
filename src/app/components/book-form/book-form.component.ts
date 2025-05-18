import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Book } from '../../models/book';
import { OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnChanges {
  @Input() book: Book | null = null;
  @Output() submitForm = new EventEmitter<Book>();

  bookForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      author: ['', [Validators.required, Validators.maxLength(50)]],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.min(0), Validators.max(100)]],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['book'] && this.book) {
      this.bookForm.reset({
        id: this.book.id || '',
        title: this.book.title,
        author: this.book.author,
        price: this.book.price,
        discount: this.book.discount ?? 0
      });
    }
  }


onSubmit() {
  if (this.bookForm.valid) {
    const formValue = this.bookForm.value;
    const bookData = this.book 
      ? { 
          ...formValue, 
          id: this.book.id,
          discount: formValue.discount || null
        }
      : { 
          title: formValue.title,
          author: formValue.author,
          price: formValue.price,
          discount: formValue.discount || null
        };
    this.submitForm.emit(bookData as Book);
  }
}


  get title() { return this.bookForm.get('title'); }
  get author() { return this.bookForm.get('author'); }
  get price() { return this.bookForm.get('price'); }
  get discount() { return this.bookForm.get('discount'); }
}