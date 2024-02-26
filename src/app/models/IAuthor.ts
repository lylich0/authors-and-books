import { Book } from "./IBook";

export interface Author {
  id?: string;
  lastName: string;
  firstName: string;
  middleName?: string;
  birthDate: Date;
  books: Book[];
}
