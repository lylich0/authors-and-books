import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthorService} from "../author/author.service";
import {Book} from "../../models/IBook";
import {map, mergeMap, Observable } from "rxjs";
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

  createBook(authorId: string | null, book: Book): Observable<Author> {
    const id = this.generateRandomId();

    return this.http.get<Author>(`${this.baseURL}/${authorId}`).pipe(
      mergeMap((author: Author) => {
        book.id = id;
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

  searchBooks(authorId: any, search: string): Observable<Author> {
    return this.http.get<Author>(`${this.baseURL}/${authorId}`).pipe(
      map((author: Author) => {
        author.books = author.books.filter(book => book.title === search);
        return author;
      })
    );
  }

  generateRandomId(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
