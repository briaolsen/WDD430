import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorDetailComponent } from './authors/author-detail/author-detail.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorsComponent } from './authors/authors.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookEditComponent } from './books/book-edit/book-edit.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BooksComponent } from './books/books.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BooksComponent, children: [
    { path: 'new', component: BookEditComponent },
    { path: ':id', component: BookDetailComponent },
    { path: ':id/edit', component: BookEditComponent }

  ]},
  { path: 'authors', component: AuthorsComponent, children: [
    { path: ':id', component: AuthorDetailComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
