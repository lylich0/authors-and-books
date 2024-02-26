import { Observable } from "rxjs";
import {Author} from "../../models/IAuthor";
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseURL = `http://localhost:3000/cards`

  constructor(private http: HttpClient) {}

  getAll(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseURL);
  }

  sortAll(authors: Author[], sortBy: string): Author[] {
    return authors.sort((a, b) => {
      if (sortBy === 'firstName') {
        return a.firstName.localeCompare(b.firstName);
      } else if (sortBy === 'lastName') {
        return a.lastName.localeCompare(b.lastName);
      } else if (sortBy === 'booksNumber') {
        return b.books.length - a.books.length;
      } else {
        return 0;
      }
    });
  }

  get(id: any): Observable<Author> {
    return this.http.get<Author>(`${this.baseURL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(this.baseURL, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.baseURL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }
}
