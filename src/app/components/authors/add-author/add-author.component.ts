import {Component, OnInit} from '@angular/core';
import { Author } from "../../../models/IAuthor";
import { AuthorService } from "../../../services/author/author.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent {
  newAuthor: Author = {
    birthDate: null as unknown as Date,
    firstName: "",
    lastName: "",
    middleName: "",
    books: []
  };

  constructor(private authorService: AuthorService, private route: ActivatedRoute, private router: Router) {}

  onSubmit(): void {
    this.authorService.create(this.newAuthor).subscribe((createdAuthor) => {
      const authorId = createdAuthor.id;
      this.router.navigate(['/authors', authorId, 'edit', 'book', 'new']);
    });
  }
}
