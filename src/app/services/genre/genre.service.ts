import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Author} from "../../models/IAuthor";
import {Genre} from "../../models/IGenre";

@Injectable({
  providedIn: 'root'
})
export class GenreService {
  private baseURL = 'http://localhost:3000/genres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.baseURL);
  }
}
