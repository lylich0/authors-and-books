import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/authors/main/main.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { GenresComponent } from './components/genres/genres.component';
import { BookComponent } from './components/authors/book/book.component';
import {CustomValidatorDirective} from "./directives/custom-validator.directive";
import { BookManagementComponent } from './components/authors/book/book-management/book-management.component';
import { AuthorManagementComponent } from './components/authors/main/author-management/author-management.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    GenresComponent,
    BookComponent,
    BookManagementComponent,
    AuthorManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CustomValidatorDirective,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
