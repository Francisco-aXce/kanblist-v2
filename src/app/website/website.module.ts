import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { WebsiteRoutingModule } from './website-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { BoardComponent } from './components/board/board.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { TaskComponent } from './components/task/task.component';
import { TaskModalComponent } from './components/task-modal/task-modal.component';


@NgModule({
  declarations: [
    NavComponent,
    LayoutComponent,
    BoardComponent,
    BoardsComponent,
    TaskComponent,
    TaskModalComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule
  ]
})
export class WebsiteModule { }
