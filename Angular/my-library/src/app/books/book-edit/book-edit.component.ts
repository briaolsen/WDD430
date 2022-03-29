import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  originalBook: Book;
  book: Book;
  editMode: boolean = false;
  bookRead: boolean = false;

  constructor(private bookService: BookService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    
    this.route.params.subscribe(
      (params: Params) => {
        let id = params['id'];
        if(!id) {
          this.editMode = false;
          return;
        }
        this.originalBook = this.bookService.getBook(id);
        if(!this.originalBook) {
          return;
        }
        this.editMode = true;
        this.bookRead = this.originalBook.read;
        this.book = JSON.parse(JSON.stringify(this.originalBook));
      }
    )
  }
  
  onUpdate(form: NgForm) {
    let value = form.value;
    let newBook = new Book(value.id, value.title, value.series, value.first, value.last, value.url, value.read);

    if(this.editMode) {
      this.bookService.updateBook(this.originalBook, newBook);
    } else {
      this.bookService.addBook(newBook);
    }

    this.router.navigate(['../books']);
  }

  onCancel() {
    this.router.navigate(['../books'])
  }

}
