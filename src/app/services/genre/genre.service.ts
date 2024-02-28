import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {Author} from "../../models/IAuthor";
import {Genre} from "../../models/IGenre";
import {BookService} from "../book/book.service";

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private baseURL = 'http://localhost:3000/genres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Genre[]> {
    const sortedGenresJson = localStorage.getItem('sortedGenres');
    if (sortedGenresJson) {
      const genres: Genre[] = JSON.parse(sortedGenresJson);
      return of(genres);
    }
    else {
      return this.http.get<Genre[]>(this.baseURL);
    }
  }

  createGenre(genre: any): Observable<any> {
    return this.http.post(this.baseURL, genre);
  }

  deleteGenre(id: any): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  sortGenre(genres: Genre[]): Genre[] {
    const sortedGenres = genres.sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    localStorage.setItem('sortedGenres', JSON.stringify(sortedGenres));
    return sortedGenres;
  }
}
