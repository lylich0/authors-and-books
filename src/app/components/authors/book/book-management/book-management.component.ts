import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../../services/book/book.service";
import {GenreService} from "../../../../services/genre/genre.service";
import {Book} from "../../../../models/IBook";
import {Genre} from "../../../../models/IGenre";
import {map} from "rxjs";

@Component({
  selector: 'app-book-management',
  templateUrl: './book-management.component.html',
  styleUrls: ['./book-management.component.css']
})
export class BookManagementComponent implements OnInit {
  isNewBook: boolean = true

  books: Book[] = [];
  genres: Genre[] = [];

  updatedBook: Book = {
    title: "",
    pageCount: 0,
    genre: ""
  }

  newBook: Book = {
    title: "",
    pageCount: 0,
    genre: ""
  }

  authorId: string | null = '';
  bookId: string | null = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private bookService: BookService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    this.bookId = this.route.snapshot.paramMap.get('bookId');

    this.isNewBook = !this.bookId;

    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
    });

    if (!this.isNewBook) {
      this.bookService.getBooks(this.authorId).pipe(
        map(books => books.find(book => book.id === this.bookId) as Book)
      ).subscribe(book => this.updatedBook = book);
    }
  }

  onSubmit(): void {
    this.bookService.createBook(this.authorId, this.newBook).subscribe(() => {
      this.router.navigate(['/authors', this.authorId, 'edit']);
    });
  }

  onUpdate() {
    this.bookService.updateBook(this.authorId, this.updatedBook).subscribe({
      next: () => {
        this.router.navigate(['/authors', this.authorId, 'edit'])
      }
    })
  }
}
