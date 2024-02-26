import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthorService} from "../author/author.service";
import {Book} from "../../models/IBook";
import {map, mergeMap, Observable, throwError} from "rxjs";
import {Author} from "../../models/IAuthor";


@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseURL = 'http://localhost:3000/cards';
  constructor(private http: HttpClient, private authorService: AuthorService) {}

  // custom routes are not supported by json-server
  getBooks(authorId: any): Observable<Book[]> {
    return this.http.get<Author>(`${this.baseURL}/${authorId}`).pipe(
      map((author: Author) => {
        return author.books;
      })
    );
  }

  createBook(authorId: string, book: Book): Observable<Author> {
    return this.http.get<Author>(`${this.baseURL}/${authorId}`).pipe(
      mergeMap((author: Author) => {
        author.books.push(book);
        return this.http.put<Author>(`${this.baseURL}/${authorId}`, author);
      })
    );
  }

  updateBook(authorId: string | null, updatedBook: Book): Observable<Author> {
    return this.http.get<Author>(`${this.baseURL}/${authorId}`).pipe(
      mergeMap((author: Author) => {
        const index = author.books.findIndex(book => book.id === updatedBook.id);
        author.books[index] = updatedBook;
        return this.http.put<Author>(`${this.baseURL}/${authorId}`, author);
      })
    );
  }

  deleteBook(authorId: string | null, bookId: string): Observable<Author> {
    return this.http.get<Author>(`${this.baseURL}/${authorId}`).pipe(
      mergeMap((author: Author) => {
        author.books = author.books.filter(book => book.id !== bookId);
        return this.http.put<Author>(`${this.baseURL}/${authorId}`, author);
      })
    );
  }
}
