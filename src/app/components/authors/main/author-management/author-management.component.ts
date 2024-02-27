import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../../../services/author/author.service";
import {Author} from "../../../../models/IAuthor";

@Component({
  selector: 'app-author-management',
  templateUrl: './author-management.component.html',
  styleUrls: ['./author-management.component.css']
})
export class AuthorManagementComponent implements OnInit {
  state: string = '';

  author: Author = {birthDate: new Date(), lastName: "", firstName: '', books: [], id: '' };

  newAuthor: Author = {
    birthDate: null as unknown as Date,
    firstName: "",
    lastName: "",
    middleName: "",
    books: []
  };

  id: string | null = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authorService: AuthorService
  ) {}

  headerText: { [key: string]: string } = {
    'add': 'Adding author',
    'edit': 'Editing author information',
    'view': 'Viewing author details'
  };

  ngOnInit(): void {
    this.state = this.authorService.getState();

    if (this.state !== 'add') {
      this.id = this.route.snapshot.paramMap.get('id');
      this.authorService.get(this.id).subscribe(author => {
        this.author = author;
      })
    }
  }

  handleFormSubmit() {
    if (this.state === 'add') {
      this.addAuthor()
    }
    else if (this.state === 'edit') {
      this.editAuthor();
    }
  }

  addAuthor() {
    this.authorService.create(this.newAuthor).subscribe((createdAuthor) => {
      const authorId = createdAuthor.id;
      this.router.navigate(['/authors', authorId, 'edit', 'book', 'new']);
    });
  }

  editAuthor() {
    this.authorService.update(this.id, this.author).subscribe({
      next: () => {
        this.router.navigate(['/authors']);
      }
    })
  }
}
