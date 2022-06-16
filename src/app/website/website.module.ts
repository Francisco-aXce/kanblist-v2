import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { BoardComponent } from './components/board/board.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { TaskComponent } from './components/task/task.component';


@NgModule({
  declarations: [
    NavComponent,
    LayoutComponent,
    BoardComponent,
    BoardsComponent,
    TaskComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule
  ]
})
export class WebsiteModule { }
