import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { WebsiteRoutingModule } from './website-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavComponent } from './components/nav/nav.component';
import { BoardComponent } from './components/board/board.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { TaskComponent } from './components/task/task.component';
import { GeneralModalComponent } from './components/general-modal/general-modal.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';


@NgModule({
  declarations: [
    NavComponent,
    LayoutComponent,
    BoardComponent,
    BoardsComponent,
    TaskComponent,
    GeneralModalComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectCardComponent
  ],
  imports: [
    CommonModule,
    WebsiteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class WebsiteModule { }
