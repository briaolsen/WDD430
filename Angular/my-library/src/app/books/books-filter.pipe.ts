import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './book.model';

@Pipe({
  name: 'booksFilter'
})
export class BooksFilterPipe implements PipeTransform {

  transform(books: Book[], term: string): any {
    let filteredBooks: Book[] = [];

    if(!term) {
      return books;
    }
    term.toLowerCase();

    for(let book of books) {
      if(book.title.toLowerCase().includes(term) ||
         book.first.toLowerCase().includes(term)  ||
         book.last.toLowerCase().includes(term) ||
         book.series.toLowerCase().includes(term)) 
      {
        filteredBooks.push(book);
      }
    }
  
    return filteredBooks;
  }

}