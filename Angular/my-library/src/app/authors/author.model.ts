import { Book } from "../books/book.model";

export class Author {

  constructor(
    public name: string, 
    public books: Book[] ) {}

}
