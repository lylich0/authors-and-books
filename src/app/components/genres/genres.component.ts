import { Component, OnInit } from '@angular/core';
import { Genre } from "../../models/IGenre";
import {GenreService} from "../../services/genre/genre.service";

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];

  genre: Genre = {
    name: ""
  };

  constructor(private genreService: GenreService) {}

  ngOnInit(): void {
    this.genreService.getAll().subscribe(genres => {
      this.genres = genres;
    })
  }

  onSubmit() {
    this.genreService.createGenre(this.genre).subscribe((genre: Genre) => {
      this.genres.push(genre)
    })
  }

  onDelete(id: any) {
    this.genreService.deleteGenre(id).subscribe(() => {
      this.genres = this.genres.filter(genre => genre.id !== id)
    });
  }

  sort() {
    return this.genreService.sortGenre(this.genres);
  }
}
