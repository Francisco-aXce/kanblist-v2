import { Component, Input, OnInit } from '@angular/core';

import { BoardsService } from 'src/app/services/boards.service';
import { Board, Task } from '../../../models/board.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @Input() task: Task = {
    name: '',
    order: 0,
    description: '',
    color: ''
  }

  constructor(
    private boardsService: BoardsService
  ) {

  }

  ngOnInit(): void {
  }

  delete() {
    this.boardsService.deleteTask(this.task.projectId!, this.task.boardId!, this.task.id!).then(resp => {
      console.log("Task deleted! -> ", resp);
    }).catch(error => {
      console.error(error);
    });
  }

  // edit() {
  //   this.boardsService.modifyingBoardId = this.parentId;
  //   this.boardsService.modifyingTaskId = this.task.id;

  //   //this.cardsService.activeModal.next("task");
  // }

}
