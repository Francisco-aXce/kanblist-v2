import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models/board.model';
import { BoardsService } from 'src/app/services/boards.service';
import { ModalService } from 'src/app/services/modal.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { promises } from 'dns';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  @Input() board: Board = {
    name: '',
    order: 0,
    color: '',
    tasks: []
  };

  previousName: string = "";

  constructor(
    private boardsService: BoardsService,
    private modalService: ModalService
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

  // If is im focussing on the title, save the previous name and when blur compare it and only update
  // if it changed
  nameChanged(focus: boolean) {
    if(focus) {
      this.previousName = this.board.name;
    }else{
      if(this.previousName !== this.board.name){
        this.update();
      }
      this.previousName = "";
    }
  }

  update(){
    this.boardsService.updateBoard(this.board).then(() => {
      console.log("Card updated");
    }).catch((error) => {
      console.log(error);
    })

  }

  delete() {
    this.boardsService.deleteBoard(this.board.projectId!, this.board.id!).then(() => {
      console.log("Card deleted");
    }).catch((error) => {
      console.log(error);
    });
  }

  // TODO: Change board color

  // ^^^^^^^^^^^^^^^^^^^^^^^^

  onAddTask() {
    this.modalService.open({type: "add-task", projectId: this.board.projectId, boardId: this.board.id});
  }

  dropTask(event: CdkDragDrop<any>) {
    const { previousContainer, container, previousIndex, currentIndex } = event;
    const isSameContainer = previousContainer === container;

    if (isSameContainer && previousIndex === currentIndex) return;

    if (isSameContainer) {
      moveItemInArray(this.board.tasks!, previousIndex, currentIndex);
      this.boardsService.organizeTasksOrder(this.board.id!);
      console.log("Same container");
    }else {
      transferArrayItem(previousContainer.data, container.data, previousIndex, currentIndex);
      const task = {...this.board.tasks[currentIndex]};
      this.boardsService.addTask(this.projectId!, this.board.id!, {...task, order: currentIndex}, true);
      this.boardsService.deleteTask(this.projectId!, task.boardId!, task.id!);
      console.log("Different container");
    }
    //this.boardsService.organizeTasksOrder();
  }

  log(msg: string) {
    console.log(msg);
  }

  get projectId() {
    return this.boardsService.project.id;
  }

}
