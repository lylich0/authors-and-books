import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/authors/main/main.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddAuthorComponent } from './components/authors/add-author/add-author.component';
import { HttpClientModule } from "@angular/common/http";
import { GenresComponent } from './components/genres/genres.component';
import { EditAuthorComponent } from './components/authors/edit-author/edit-author.component';
import { BookComponent } from './components/authors/book/book.component';
import { AddBookComponent } from './components/authors/book/add-book/add-book.component';
import { EditBookComponent } from './components/authors/book/edit-book/edit-book.component';
import {CustomValidatorDirective} from "./directives/custom-validator.directive";

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    AddAuthorComponent,
    GenresComponent,
    EditAuthorComponent,
    BookComponent,
    AddBookComponent,
    EditBookComponent,
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
