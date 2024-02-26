import { Component, OnInit } from '@angular/core';
import { AuthorService } from "../../../services/author/author.service";
import { Author } from "../../../models/IAuthor";
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  authors: Author[] = [];
  selectedAuthor: Author | null = null;

  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.authorService.getAll().subscribe(authors => {
      this.authors = authors;
    });
  }

  view(id: string) {
    this.authorService.get(id).subscribe(author => {
      this.selectedAuthor = author;
      console.log(this.selectedAuthor);
    })
  }

  delete(id: string) {
    this.authorService.delete(id).subscribe(author => {
      this.authors = this.authors.filter(author => author.id !== id);
      console.log("Deleted this author: ", author);
    })
  }

  edit(id: string) {
    this.router.navigate(['/authors', id, 'edit'])
  }

  add() {
    this.router.navigate(['/authors/new'])
  }

  sort(sortBy: string) {
    this.authorService.sortAll(this.authors, sortBy)
  }
}
