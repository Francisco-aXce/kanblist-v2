import { Component, Input, OnInit } from '@angular/core';

import { BoardsService } from 'src/app/services/boards.service';
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
    private boardsService: BoardsService
  ) {

  }

  ngOnInit(): void {
  }

  delete() {
    this.boardsService.deleteTask(this.parentId, this.task.id);
  }

  edit() {
    this.boardsService.modifyingCardId = this.parentId;
    this.boardsService.modifyingTaskId = this.task.id;

    //this.cardsService.activeModal.next("task");
  }

}
