import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.css']
})
export class BookItemComponent implements OnInit {
  @Input('book') book: Book;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
  }

  onRead() {
    this.bookService.onRead(this.book);
  }

}
