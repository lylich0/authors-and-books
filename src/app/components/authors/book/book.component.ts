import {Component, OnInit} from '@angular/core';
import {Book} from "../../../models/IBook";
import {BookService} from "../../../services/book/book.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books: Book[] = [];
  authorId: string | null = '';

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    this.getBooksByAuthorId(this.authorId);
  }

  getBooksByAuthorId(authorId: string | null): void {
    this.bookService.getBooks(authorId).subscribe(books => {
      this.books = books;
    });
  }

  deleteBook(bookId: string): void {
    this.bookService.deleteBook(this.authorId, bookId).subscribe(book => {
      this.books = this.books.filter(book => book.id !== bookId);
    })
  }

  editBook(bookId: string): void {
    this.router.navigate(['/authors', this.authorId, 'edit', 'book', bookId]);
  }
  addBook() {
    this.router.navigate(['/authors', this.authorId, 'edit', 'book', 'new']);
  }
}
