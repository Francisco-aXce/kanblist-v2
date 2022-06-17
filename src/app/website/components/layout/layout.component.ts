import { Component, OnInit } from '@angular/core';

import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    // private cardsService: CardsService
  ) { }

  ngOnInit(): void {
  }

  // hide() {
  //   this.cardsService.activeModal = '';
  // }

  // showBackScreen() {
  //   return this.cardsService.activeModal !== '';
  // }

}
