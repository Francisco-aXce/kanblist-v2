import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card.model';
import { CardsService } from 'src/app/services/cards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() card: Card = {
    name: '',
    id: 0,
    payloadId: '',
    color: '',
    tasks: [{
      name: '',
      description: '',
      id: 0,
      color: ''
    }]
  };

  previousName: string = "";

  constructor(
    private cardsService: CardsService
  ) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.grow();
    }, 0.1);
  }

  grow() {
    let element = document.getElementById('title');

    if(element === null) return;

    element.style.height = "10px";
    element.style.height = (element.scrollHeight)+"px";
  }

  nameChanged(focus: boolean) {
    if(focus) {
      this.previousName = this.card.name;
    }else{
      if(this.previousName !== this.card.name){
        this.update();
      }
      this.previousName = "";
    }
  }

  update(){
    this.cardsService.updateCard(this.card.payloadId, this.card).then(() => {
      console.log("Card updated");
    }).catch((error) => {
      console.log(error);
    })

  }

  delete() {
    this.cardsService.deleteCard(this.card.payloadId).then(() => {
      console.log("Card deleted");
      this.cardsService.organizeIds();
    }).catch((error) => {
      console.log(error);
    });
  }

  onAddTask() {
    this.cardsService.modifyingCardId = this.card.id;

    this.cardsService.activeModal.next('task');
  }

}
