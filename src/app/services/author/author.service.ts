import {Observable, of, tap} from "rxjs";
import {Author} from "../../models/IAuthor";
import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private baseURL = `http://localhost:3000/cards`

  state: 'add' | 'edit' | 'view' = 'add';

  setState(newState: 'add' | 'edit' | 'view') {
    this.state = newState;
    localStorage.setItem('state', newState);
  }

  getState(): 'add' | 'edit' | 'view' {
    return this.state;
  }

  constructor(private http: HttpClient) {
    const storedState = localStorage.getItem('state');
    if (storedState) {
      this.state = storedState as 'add' | 'edit' | 'view';
    }
  }

  getAll(): Observable<Author[]> {
    const sortedAuthorsJson = localStorage.getItem('sortedAuthors');
    if (sortedAuthorsJson) {
      const authors: Author[] = JSON.parse(sortedAuthorsJson);
      return of(authors);
    }
    else {
      return this.http.get<Author[]>(this.baseURL);
    }
  }

  sort(authors: Author[], sortBy: string): Author[] {
    const sortedAuthors = authors.sort((a, b) => {
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
    localStorage.setItem('sortedAuthors', JSON.stringify(sortedAuthors));
    return sortedAuthors;
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
