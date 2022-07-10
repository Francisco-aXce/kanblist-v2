import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentGuard } from '../guards/content.guard';

import { HomeGuard } from '../guards/home.guard';
import { ProjectsHubGuard } from '../guards/projects-hub.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { HomeComponent } from './pages/home/home.component';
import { ListsComponent } from './pages/lists/lists.component';
import { ProjectsComponent } from './pages/projects/projects.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'projects',
        canActivate: [ProjectsHubGuard],
        component: ProjectsComponent
      },
      {
        path: 'home',
        canActivate: [HomeGuard],
        component: HomeComponent
      },
      {
        path: 'boards/:id',
        canActivate: [ContentGuard],
        component: BoardsComponent
      },
      {
        path: 'lists',
        canActivate: [ContentGuard],
        component: ListsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebsiteRoutingModule { }
