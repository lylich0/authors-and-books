import {Component, OnInit} from '@angular/core';
import {Book} from "../../../../models/IBook";
import {AuthorService} from "../../../../services/author/author.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../../../../services/book/book.service";
import {HttpClient} from "@angular/common/http";
import {Genre} from "../../../../models/IGenre";
import {GenreService} from "../../../../services/genre/genre.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  genres: Genre[] = [];

  newBook: Book = {
    genre: "",
    pageCount: 0,
    title: ""
  }
  private authorId: any;

  constructor(private bookService: BookService, private route: ActivatedRoute, private router: Router, private genreService: GenreService) {}

  ngOnInit(): void {
    this.authorId = this.route.snapshot.paramMap.get('id');

    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
      console.log(this.genres)
    });
  }

  onSubmit(): void {
    this.bookService.createBook(this.authorId, this.newBook).subscribe(() => {
      this.router.navigate(['/authors', this.authorId, 'edit']);
    });
  }
}
