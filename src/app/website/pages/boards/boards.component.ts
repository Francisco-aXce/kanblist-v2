import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Subscription, switchMap } from 'rxjs';

import { Board, Task } from 'src/app/models/board.model';
import { Project } from 'src/app/models/project.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { BoardsService } from '../../../services/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  boardsSubscription: Subscription | null = null;
  tasksSubscription: Subscription = new Subscription();
  initialSubTask : boolean = false;

  project: Project = {
    id: '',
    name: '',
    description: '',
    color: '',
    owner: '',
    boards: []
  };

  uId: string = '';
  projectId: string | null = null;

  constructor(
    private projectsService: ProjectsService,
    private boardsService: BoardsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    this.boardsSubscription = this.authService.getUser()
      .pipe(
        switchMap(user => {
          //At this point im sure there is a user and a projectId because of the content guard
          this.uId = user!.uid;
          return this.projectsService.getProjectById(this.projectId!, user!.uid);
        }),
        switchMap((project: Project) => {
          this.project = {
            id: this.projectId!,
            ...project
          };
          return this.boardsService.getBoards(this.project.id!, this.uId);
        })
      ).subscribe({
        next: (boards: any) => {
          let bds: Board[] = [];
          boards.forEach((board: any) => {
            bds.push({
              id: board.payload.doc.id,
              projectId: this.projectId,
              ...board.payload.doc.data()
              });
            });
          //Sort bds by order
          bds.sort((a, b) => {
            return a.order - b.order;
          });

          if(!this.initialSubTask) {
            this.project.boards = bds;
            this.subscribeTasks();
            this.initialSubTask = true;
          }else {
            const newBds = bds.filter(board => !(this.project.boards!.find(b => b.id === board.id)));
            const existingBds = this.project.boards!.filter(board => bds.find(b => b.id === board.id));
            let existingBdsNewData: Board[]= [];
            existingBds.forEach(board => {
              existingBdsNewData.push({...board, ...bds.find(b => b.id === board.id)});
            });
            this.project.boards = [...existingBdsNewData, ...newBds];
          }

          this.boardsService.project = this.project;
        },
        error: (err) => {
          console.error('Error en la subscripcion de boards: -> ', err);
          this.router.navigate(['home']);
        }
      });
  }

  subscribeTasks() {
    this.project.boards?.forEach(board => {
      this.tasksSubscription.add(
        this.boardsService.getTasks(this.projectId!, board.id!, this.uId)
        .subscribe((tasks) => {
          let t: Task[] = [];
          tasks.forEach((task: any) => {
            t.push({
              id: task.payload.doc.id,
              boardId: board.id,
              projectId: this.projectId,
              ...task.payload.doc.data()
            });
          });
          //Sord tasks by order
          t.sort((a, b) => {
            return a.order - b.order;
          });
          board.tasks = t;
        })
      );
    });
  }

  subNewBoard(boardId: string) {
    this.tasksSubscription.add(
      this.boardsService.getTasks(this.projectId!, boardId, this.uId)
      .subscribe((tasks) => {
        let t: Task[] = [];
        tasks.forEach((task: any) => {
          t.push({
            id: task.payload.doc.id,
            boardId: boardId,
            projectId: this.projectId,
            ...task.payload.doc.data()
          });
        });
        //Sord tasks by order
        t.sort((a, b) => {
          return a.order - b.order;
        });
        this.boardsService.project.boards!.find(board => board.id === boardId)!.tasks = t;
      })
    )
  }

  addNewBoard() {
    this.boardsService.addBoard().then((docRef) => {
      this.subNewBoard(docRef.id);
      console.log("board added");
    }).catch((error) => {
      console.log(error);
    });
  }

  drop(event : CdkDragDrop<any>) {
    const { previousIndex, currentIndex } = event;

    moveItemInArray(this.project.boards!, previousIndex, currentIndex);
    this.boardsService.organizeBoardsOrder();
  }

  ngOnDestroy(): void {
    this.boardsSubscription?.unsubscribe();
    this.tasksSubscription.unsubscribe();
  }

}
