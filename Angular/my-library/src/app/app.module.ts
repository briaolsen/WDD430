import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { BookItemComponent } from './books/book-item/book-item.component';
import { AuthorItemComponent } from './authors/author-item/author-item.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BooksFilterPipe } from './books/books-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksComponent,
    AuthorsComponent,
    BookEditComponent,
    BookDetailComponent,
    BookListComponent,
    AuthorListComponent,
    AuthorDetailComponent,
    BookItemComponent,
    AuthorItemComponent,
    HomeComponent,
    BooksFilterPipe
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
