import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Card, Task } from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  cards: Card[] = [];

  activeModal: string = '';

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAllCards(){
    return this.firestore.collection('cards').snapshotChanges();
  }

  addBoard(): Promise<any> {
    return this.firestore.collection('cards').add(
      {
        name: 'New board',
        id: this.cards.length,
        payloadId: '',
        color: '',
        tasks: []
      }
    );
  }

  updateCard(payloadId: string, data: Card): Promise<any> {
    return this.firestore.collection('cards').doc(payloadId).update(data);
  }

  deleteCard(payloadId: string): Promise<any> {
    return this.firestore.collection('cards').doc(payloadId).delete();
  }

  //Add function that organize the boards and tasks ids. The idea is to have an id that is equal to the board index
  organizeIds(){
    let changes = false;
    for (let i=0; i<this.cards.length; i++){
      if(this.cards[i].id !== i){
        this.cards[i].id = i;
        changes = true;
      }
      for (let t=0; t<this.cards[i].tasks.length; t++){
        if(this.cards[i].tasks[t].id){
          this.cards[i].tasks[t].id = t;
          changes = true;
        }
      }
      if(changes) this.updateCard(this.cards[i].payloadId, this.cards[i]).then(() => {
        console.log(this.cards[i].name, "organized");
      });
    }
  }

  addTask(cardId: number, task: Task) {
    this.cards[cardId].tasks.unshift(task);
    this.organizeIds();
  }
}
