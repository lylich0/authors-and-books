import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/authors/main/main.component";
import {GenresComponent} from "./components/genres/genres.component";
import {BookManagementComponent} from "./components/authors/book/book-management/book-management.component";
import {AuthorManagementComponent} from "./components/authors/main/author-management/author-management.component";


const routes: Routes = [
  { path: '', redirectTo: 'authors', pathMatch: 'full' },
  { path: 'authors', component: MainComponent},
  { path: 'authors/new', component: AuthorManagementComponent},
  { path: 'authors/:id/edit', component: AuthorManagementComponent},
  { path: 'authors/:id/view', component: AuthorManagementComponent},
  { path: 'authors/:id/edit/book/new', component: BookManagementComponent},
  { path: 'authors/:id/edit/book/:bookId', component: BookManagementComponent},
  { path: 'genres', component: GenresComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
