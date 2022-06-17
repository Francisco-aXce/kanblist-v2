import { Component, Input, OnInit } from '@angular/core';

import { CardsService } from 'src/app/services/cards.service';
import { Task } from './../../../models/card.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = {
    name: '',
    id: 0,
    description: '',
    color: ''
  }

  @Input() parentId: number = -1;

  constructor(
    private cardsService: CardsService
  ) {

  }

  ngOnInit(): void {
  }

  delete() {
    this.cardsService.deleteTask(this.parentId, this.task.id);
  }

  edit() {
    this.cardsService.modifyingCardId = this.parentId;
    this.cardsService.modifyingTaskId = this.task.id;

    this.cardsService.activeModal.next("task");
  }

}
