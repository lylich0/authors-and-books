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
  constructor(private authorService: AuthorService, private router: Router) { }

  ngOnInit(): void {
    this.authorService.getAll().subscribe(authors => {
      this.authors = authors;
    });
  }

  add() {
    this.authorService.setState('add');
    this.router.navigate(['/authors/new'])
  }

  view(id: string) {
    this.authorService.setState('view');
    this.router.navigate(['/authors', id, 'view']);
  }

  edit(id: string) {
    this.authorService.setState('edit');
    this.router.navigate(['/authors', id, 'edit']);
  };

  delete(id: string) {
    this.authorService.delete(id).subscribe(author => {
      this.authors = this.authors.filter(author => author.id !== id);
    })
  }
  sort(sortBy: string) {
    this.authorService.sort(this.authors, sortBy);
  }
}
