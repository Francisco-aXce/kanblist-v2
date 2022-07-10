import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';

import { ModalService } from '../../../services/modal.service';
import { Task } from '../../../models/board.model';
import { ProjectsService } from '../../../services/projects.service';
import { AuthService } from '../../../services/auth.service';
import { Project } from 'src/app/models/project.model';
import { ModalInfo } from 'src/app/models/modalInfo.model';
import { BoardsService } from 'src/app/services/boards.service';

@Component({
  selector: 'general-modal',
  templateUrl: './general-modal.component.html',
  styleUrls: ['./general-modal.component.scss']
})
export class GeneralModalComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private authService: AuthService,
    private projectsService: ProjectsService,
    private boardsService: BoardsService,
    private formBuilder:FormBuilder
  ) {
    this.buildForm();
  }

  modalSubscription: Subscription | undefined;

  theModal: Modal | undefined;

  //TODO: Mejorar el manejo de estos datos
  title: string = '';
  action: string = "";
  type: string = '';
  modalData: ModalInfo | null = null;

  modifying: boolean = false;

  form!: FormGroup;


  ngOnInit(): void {
    this.modalSubscription = this.modalService.activeModal.subscribe((data: ModalInfo) => {
      this.modalData = data;
      switch(data.type){
        case 'add-project':
          this.type = 'project';
          this.buildForm();
          this.title = 'Add Project';
          this.action = 'Add';
          break;
        case 'edit-project':
          this.type = 'project';
          this.buildForm(this.projectsService.getProject(this.projectsService.modifyingId));
          this.title = 'Edit Project';
          this.action = 'Edit';
          break;
        case 'add-task':
          this.type = 'task';
          this.buildForm();
          this.title = 'Add Task';
          this.action = 'Add';
          break;
      }
      if(data.type) this.open();
    });
  }

  open() {
    let modal = document.getElementById("theModal");
    if(modal) {
      this.theModal = new bootstrap.Modal(modal, {
        keyboard: true // Close the modal if the user press the escape key
      });
    }
    this.theModal?.show();
  }

  // Close the modal
  // Hide call means that i need to close the modal manually
  close(hideCall: boolean = false) {
    this.modalService.activeModal.next({type: ''});
    if(hideCall && this.theModal) this.theModal.hide();
    this.modalData = null;
  }

  private buildForm(initial?: Task | Project) {
    if(initial) console.log(initial);
    initial ??= {
      name: '',
      description: '',
      color: 'bg-light'
    };
    // I build the form depending of his type(project or task)
    switch(this.type){
      case 'project':
        this.form = this.formBuilder.group({
          name: [initial.name, Validators.required],
          description: [initial.description],
          color: [initial.color]
        });
        break;
      case 'task':
        this.form = this.formBuilder.group({
          name: [initial.name, Validators.required],
          description: [initial.description],
          color: [initial.color]
        });
    }
  }

  async confirm() {
    this.form.markAllAsTouched();
    console.log(this.form.value);
    if(this.form.invalid) return;

    let uid = await this.authService.currentUser().then((user) => {
      return user ? user.uid : '';
    });

    if(this.type === 'project'){
      switch (this.action) {
        case 'Add':
          this.projectsService.addProject(
            {
              name: this.form.value.name.trim(),
              description: this.form.value.description,
              owner: uid,
              color: this.form.value.color
            }).then(() => {
              console.log("Project added");
            }).catch(err => {
              console.error(err);
            });
          break;
        case 'Edit':
          this.projectsService.update(this.projectsService.modifyingId, {
            name: this.form.value.name.trim(),
            description: this.form.value.description,
            owner: uid,
            color: this.form.value.color
          }).then(() => {
            console.log("Project updated");
          }).catch(err => {
            console.error(err);
          });
          break;
      }
    } else if (this.type === 'task'){
      switch (this.action) {
        case 'Add':
          this.boardsService.addTask(this.modalData?.projectId!, this.modalData?.boardId!, this.form.value).then(resp => {
            console.log("Task added! -> ", resp);
          }).catch(err => {
            console.error(err);
          });
          break;
      }
    }
    this.close(true);
  }

  // get invalidName(){
  //   return this.form.get('name')?.touched && this.form.get('name')?.invalid;
  // }

  get tittle() {
    return this.title;
  }

  //Destroy the subscription
  ngOnDestroy(): void {
    if(this.modalSubscription) this.modalSubscription.unsubscribe();
  }
}
