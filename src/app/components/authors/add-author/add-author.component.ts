import { Component } from '@angular/core';
import { Author } from "../../../models/IAuthor";
import { AuthorService } from "../../../services/author/author.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent {
  newAuthor: Author = {
    birthDate: new Date(),
    firstName: "",
    lastName: "",
    middleName: "",
    books: []
  };

  constructor(private authorService: AuthorService, private route: Router) {}

  onSubmit(): void {
    this.authorService.create(this.newAuthor).subscribe(() => {
      this.route.navigate(['/authors']);
    });
  }
}
