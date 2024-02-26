import {Component, OnInit} from '@angular/core';
import {Author} from "../../../models/IAuthor";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../../services/author/author.service";

@Component({
  selector: 'app-edit-author',
  templateUrl: './edit-author.component.html',
  styleUrls: ['./edit-author.component.css']
})
export class EditAuthorComponent implements OnInit {
  author: Author = {birthDate: new Date(), lastName: "", firstName: '', books: [], id: '' };
  id: string | null = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authorService: AuthorService
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.authorService.get(this.id).subscribe(author => {
      this.author = author;
    })
  }

  update() {
    this.authorService.update(this.id, this.author).subscribe({
      next: () => {
        this.router.navigate(['/authors']);
      }
    })
  }
}
