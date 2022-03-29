import { EventEmitter, Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  bookSelectedEvent = new EventEmitter<Book>();
  bookListChangedEvent = new EventEmitter<Book[]>();
  maxBookId: number;
  books: Book[] = [
    // { 
    //   id: "1",
    //   title: "Harry Potter and the Sorcerer's Stone", 
    //   series: "Harry Potter", 
    //   first: "J. K.", 
    //   last: "Rowling", 
    //   url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474154022l/3._SY475_.jpg",
    //   read: true 
    // },
    // { 
    //   id: "2",
    //   title: "Harry Potter and the Chamber of Secrets", 
    //   series: "Harry Potter", 
    //   first: "J. K.", 
    //   last: "Rowling", 
    //   url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474169725l/15881._SY475_.jpg",
    //   read: true
    // },
    // {
    //   id: "3",
    //   title: "The Way of Kings", 
    //   series: "The Stormlight Archive", 
    //   first: "Brandon", 
    //   last: "Sanderson", 
    //   url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1388184640i/7235533._SY180_.jpg",
    //   read: true
    // },
    // {
    //   id: "4",
    //   title: "Words of Radiance", 
    //   series: "The Stormlight Archive", 
    //   first: "Brandon", 
    //   last: "Sanderson", 
    //   url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1507307927i/17332218._SY180_.jpg",
    //   read: true
    // },
    // {
    //   id: "5",
    //   title: "Oathbringer", 
    //   series: "The Stormlight Archive", 
    //   first: "Brandon", 
    //   last: "Sanderson", 
    //   url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1507307833i/34002132._SY180_.jpg",
    //   read: false
    // },
    // {
    //   id: "6",
    //   title: "Rhythm of War", 
    //   series: "The Stormlight Archive", 
    //   first: "Brandon", 
    //   last: "Sanderson", 
    //   url: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1599911216i/49021976._SY180_.jpg",
    //   read: false
    // }
  ];

  constructor(private http: HttpClient) {
    this.getBooks();
   }

  getMaxId(): number {
    let maxId = 0;
    for(let book of this.books) {
      let currentId = parseInt(book.id);
      if(currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

  getBooks(): Book[] {

    this.http
      .get('http://localhost:3000/books')
      .subscribe(
        (books: Book[]) => {
        this.books = books;
        this.maxBookId = this.getMaxId();
        this.sortBooks();
      },
        (error: any) => {
          console.log("There was an error in book service");
          console.log(error);
        }
      );
      return this.books.slice();
  }

  getBook(id: string) {
    for (let book of this.books) {
      if(book.id === id) {
        return book;
      }
    }
    return null;
  }

  deleteBook(book: Book) {
    if(!book) {
      return ;
    }
    const pos = this.books.indexOf(book);

    if (pos < 0) {
      return;
    }
  
    // delete from database
    this.http.delete('http://localhost:3000/books/' + book.id)
      .subscribe(
        (response: Response) => {
          this.books.splice(pos, 1);
          this.sortBooks();
        }
      );
  }

  addBook(book: Book) {
    if (!book) {
      return;
    }

    // make sure id of the new Book is empty
    book.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, book: Book }>('http://localhost:3000/books',
    book,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new book to books
          this.books.push(responseData.book);
          this.sortBooks();
        }
      );
  }

  updateBook(oldBook: Book, newBook: Book) {
    if(!oldBook || !newBook) {
      return;
    }

    const pos = this.books.indexOf(oldBook);
    if(pos < 0) {
      return;
    }

    newBook.id = oldBook.id;
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/books/' + oldBook.id,
    newBook, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.books[pos] = newBook;
          this.sortBooks();
        }
      );
  }

  sortBooks() {

    this.books.sort((a, b) => {
      let aa = a.last.toLowerCase();
      let ab = b.last.toLowerCase();
      if(aa < ab) {
        return -1;
      }
      if (aa > ab) {
        return 1;
      }
      return 0;
    });

    this.bookListChangedEvent.next([...this.books]);
  }

  onRead(book: Book) {
    const pos = this.books.indexOf(book);
    if(pos < 0) {
      return;
    }

    book.read = !book.read;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});
  
    // update database
    this.http.put('http://localhost:3000/books/' + book.id,
    book, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.books[pos] = book;
        }
      );
  }

}
