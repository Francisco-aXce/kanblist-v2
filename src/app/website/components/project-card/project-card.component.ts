import { Component, Input, OnInit } from '@angular/core';

import { ProjectsService } from './../../../services/projects.service';
import { ModalService } from './../../../services/modal.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/project.model';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss']
})
export class ProjectCardComponent implements OnInit {

  @Input() project: Project = {
    name: '',
    description: '',
    //image: '',
    color: '',
    owner: ''
  };

  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

  onEdit() {
    // I save the id of the project that i'm editing, so i can access it on the modal to update the project
    this.projectsService.modifyingId = this.project.id!;

    this.modalService.open({type: "edit-project"});
  }

  onDelete() {
    this.projectsService.delete(this.project.id!).then(() => {
      console.log("Project deleted");
    }).catch((error) => {
      console.log(error);
    });
  }

  open() {
    this.router.navigate(['boards', this.project.id]);
  }

  get name() {
    return this.project === undefined ? "Example project name" : this.project.name;
  }

  get description() {
    return this.project === undefined ? "Example description" : this.project.description;
  }

  // get image() {
  //   return this.project === undefined ? "./../../../../assets/testImg.webp" : this.project.image;
  // }

  get color() {
    return this.project.color;
  }
}
