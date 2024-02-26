import {Component, OnInit} from '@angular/core';
import {Book} from "../../../../models/IBook";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../../../services/author/author.service";
import {BookService} from "../../../../services/book/book.service";
import {Genre} from "../../../../models/IGenre";
import {GenreService} from "../../../../services/genre/genre.service";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {
  books: Book[] = [];
  book: Book = {genre: "", pageCount: 0, title: ""}
  authorId: string | null = '';
  bookId: string | null = '';
  genres: Genre[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private genreService: GenreService
  ) {}

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');
    this.bookId = this.route.snapshot.paramMap.get('bookId');

    this.bookService.getBooks(this.authorId).subscribe(books => {
      this.books = books;
      // @ts-ignore
      this.book = this.books.find(book => book.id === this.bookId);
      }
    )

    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
      console.log(this.genres)
    });
  }

  updateBook() {
    this.bookService.updateBook(this.authorId, this.book).subscribe({
      next: () => {
        this.router.navigate(['/authors', this.authorId, 'edit'])
      }
    })
  }
}
