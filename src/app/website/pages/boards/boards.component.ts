import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { Card } from 'src/app/models/card.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProjectsService } from 'src/app/services/projects.service';
import { BoardsService } from '../../../services/boards.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  subscriptions: Subscription[] = [];

  cards: Card[] = [];

  constructor(
    private projectsService: ProjectsService,
    private boardsService: BoardsService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // For now i implement a manual way to unsubscribe
    this.subscriptions =[
      // this.authService.getUser()
      // .pipe(
      //   switchMap((user) => {
      //     return [];
      //   },
      //   switchMap((user) => {
      //     return []
      //     //return user ? this.boardsService.getProjects(user!.uid) : [];
      //   }))
      // .subscribe((data) => {
      //   return [];
      // })
      // ,


      this.route.paramMap.subscribe(params => {
        // this.authService.getUser()
        // .pipe(
        //   switchMap(user => {
        //     console.log(`User: ${user?.uid}
        //     Param: ${params.get('id')}`);
        //     return user ? this.projectsService.getProjects(user.uid) : [];
        //   }),
        //   switchMap(projects => {
        //     return this.boardsService.getBoards(projects);
        //   })
        // )
        // .subscribe(data => {
        //   data.forEach(board => {
        //     console.log(board);
        //   })
        // });
        console.log(`Project ID: ${params.get('id')}\nname: ${params.get('projectName')}`);
      })

    //   this.boardsService.getAllCards().subscribe((data) => {
    //     let tmpCards: Card[] = [];
    //     data.forEach((element: any) => {
    //       tmpCards.push(element.payload.doc.data());
    //       tmpCards[tmpCards.length-1].payloadId = element.payload.doc.id;
    //     })
    //     tmpCards = tmpCards.sort((c1,c2) => {
    //       if (c1.id < c2.id) {
    //           return -1;
    //       }
    //       if (c1.id > c2.id) {
    //           return 1;
    //       }
    //       return 0;
    //     });
    //   this.boardsService.cards = [...tmpCards];
    //   this.cards = this.boardsService.cards;
    // })
  ];
  }

  addNewBoard() {
    this.boardsService.addBoard().then(() => {
      console.log("task added");
    }).catch((error) => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

}
