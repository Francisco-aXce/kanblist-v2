import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import {  ProjectsService } from './../../../services/projects.service';
import {  AuthService } from './../../../services/auth.service';
import {  ModalService } from './../../../services/modal.service';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projectsSubscription: Subscription | undefined;
  projects: Project[] = [];

  constructor(
    private projectsService: ProjectsService,
    private authService: AuthService,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.projectsSubscription = this.authService.getUser()
    .pipe(
      switchMap((user) => {
        return user ? this.projectsService.getProjects(user!.uid) : [];
      })
    )
    .subscribe((data) => {
      //console.log("Projects subscription: ", data);
      let pjts: Project[] = []
      data.forEach((project: any) => {
        pjts.push({
          id: project.payload.doc.id, // save doc id to have access to it later
          ...project.payload.doc.data()
        });
      });
      this.projectsService.projects = pjts;
      this.projects = this.projectsService.projects;
      //console.log(this.projects);
    });
  }

  ngOnDestroy(): void {
    if (this.projectsSubscription) {
      this.projectsSubscription.unsubscribe();
    }
  }

  onAddProject() {
    this.modalService.open({type: "add-project"});
  }
}
