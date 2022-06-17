import { Component, OnInit } from '@angular/core';

import { Card } from 'src/app/models/card.model';
import { CardsService } from './../../../services/cards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  cards: Card[] = [];

  constructor(
    private cardsService: CardsService
  ) { }

  ngOnInit(): void {
    this.cardsService.getAllCards().subscribe((data) => {
      let tmpCards: Card[] = [];
      data.forEach((element: any) => {
        tmpCards.push(element.payload.doc.data());
        tmpCards[tmpCards.length-1].payloadId = element.payload.doc.id;
      })
      tmpCards = tmpCards.sort((c1,c2) => {
        if (c1.id < c2.id) {
            return -1;
        }
        if (c1.id > c2.id) {
            return 1;
        }
        return 0;
      });
      this.cardsService.cards = [...tmpCards];
      this.cards = this.cardsService.cards;
    });
  }

  addNewBoard() {
    this.cardsService.addBoard().then(() => {
      console.log("task added");
    }).catch((error) => {
      console.log(error);
    });
  }

}
