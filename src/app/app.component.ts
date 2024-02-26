import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {

  // ngOnInit(): void {
  //   let sortedCards = localStorage.getItem("sortedCards");
  //   this.cards = sortedCards ? JSON.parse(sortedCards) : this.cards;
  // }
  //
  //
  // sortByAuthor(): void {
  //   this.cards.sort((a, b) => a.author.localeCompare(b.author));
  //   this.saveToLocalStorage();
  // }
  //
  // sortByBooks(): void {
  //   this.cards.sort((a, b) => b.books - a.books);
  //   this.saveToLocalStorage();
  // }
  //
  // saveToLocalStorage(): void {
  //   localStorage.setItem('sortedCards', JSON.stringify(this.cards));
  // }
}
