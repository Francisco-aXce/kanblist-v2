import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { resolve } from 'dns';
import { where } from 'firebase/firestore';
import { lastValueFrom, Observable, take, tap } from 'rxjs';

import { Board, Task } from '../models/board.model';
import { Project } from '../models/project.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  modifyingBoardId: string = '';
  modifyingTaskId: number = -1

  project: Project = {
    id: '',
    name: '',
    description: '',
    color: '',
    owner: '',
    boards: []
  };

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private router: Router
  ) { }

  getBoards(projectId: string, uId: string): Observable<any> {
    return this.db
    .collection('projects', ref => ref.where('owner', '==', uId)).doc(projectId)
    .collection('boards').snapshotChanges();
  }

  getTasks(projectId: string,boardId: string, uId: string) {
    return this.db.collection('projects', ref => ref.where('owner', '==', uId)).doc(projectId).collection('boards')
    .doc(boardId).collection('tasks').snapshotChanges();
  }

  addBoard(): Promise<any> {
    return this.db.collection('projects').doc(this.project.id).collection('boards').add(
      {
        name: '',
        color: 'bg-primary',
        order: this.project.boards ? this.project.boards.length : 0
      }
    );
  }

  updateBoard(data: Board): Promise<any> {
    return this.db.collection('projects').doc(data.projectId).collection('boards').doc(data.id).update({
      name: data.name,
      color: data.color,
      order: data.order
    });
  }

  deleteBoard(projectId: string, boardId: string): Promise<any> {
    return this.db.collection('projects').doc(projectId).collection('boards').doc(boardId).delete();
  }

  addTask(projectId: string, boardId: string, task: Task, dragging: boolean = false) {
    return this.db.collection('projects').doc(projectId).collection('boards').doc(boardId).collection('tasks').add({
      name: task.name,
      description: task.description,
      color: task.color,
      order: dragging ? task.order : this.project.boards?.find(b => b.id === boardId)!.tasks?.length
    });
  }

  updateTask(projectId: string, boardId: string, task: Task) {
    return this.db.collection('projects').doc(projectId).collection('boards').doc(boardId).collection('tasks').doc(task.id).update({
      name: task.name,
      description: task.description,
      order: task.order,
      color: task.color
    });
  }

  deleteTask(projectId: string, boardId: string, taskId: string) {
    return this.db.collection('projects').doc(projectId).collection('boards').doc(boardId).collection('tasks').doc(taskId).delete();
  }

  organizeTasksOrder(boardId: string) {
    if(!this.project.boards || !this.project.boards.find(b => b.id === boardId)) return;

    this.project.boards.find(b => b.id === boardId)!.tasks.forEach((task, index) => {
      if(task.order !== index) {
        console.log(`Order: ${task.order} | Index: ${index}`);
        task.order = index;
        this.updateTask(this.project.id!, boardId, task);
      }
    })
  }

  organizeBoardsOrder() {
    if(!this.project.boards) return;

    this.project.boards.forEach((board, index) => {
      if(board.order !== index) {
        console.log(`Order: ${board.order} | Index: ${index}`);
        board.order = index;
        this.updateBoard(board);
      }
    })
  }

  //Add function that organize the boards and tasks ids. The idea is to have an id that is equal to the board index
  // organizeIds(){
  //   let changes = false;
  //   for (let i=0; i<this.cards.length; i++){
  //     if(this.cards[i].id !== i){
  //       this.cards[i].id = i;
  //       changes = true;
  //     }
  //     for (let t=0; t<this.cards[i].tasks.length; t++){
  //       if(this.cards[i].tasks[t].id !== t){
  //         this.cards[i].tasks[t].id = t;
  //         changes = true;
  //       }
  //     }
  //     if(changes || this.cards[i].tasks.length === 0) this.updateCard(this.cards[i].payloadId, this.cards[i]).then(() => {
  //       console.log(this.cards[i].name, "organized");
  //     });
  //   }
  // }

}
