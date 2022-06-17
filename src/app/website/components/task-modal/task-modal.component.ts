import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';

import { CardsService } from './../../../services/cards.service';
import { Task } from './../../../models/card.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.scss']
})
export class TaskModalComponent implements OnInit {

  addTask: Modal | undefined;
  title: string = "Add Task";
  action: string = "Add";
  modifying: boolean = false;

  form!: FormGroup;

  constructor(
    private cardsService: CardsService,
    private formBuilder:FormBuilder
  ) {

    this.buildForm();

  }

  ngOnInit(): void {
    this.cardsService.activeModal$.subscribe((value) => {
      if(value === "task"){
        this.open();
        this.modifying = this.cardsService.modifyingTaskId === -1 ? false : true;

        if(this.modifying){
          this.buildForm(this.cardsService.cards[this.cardsService.modifyingCardId].tasks[this.cardsService.modifyingTaskId]);
        }else{
          this.buildForm();
        }
        console.log("open");
      }
    })
  }

  open() {
    let modal = document.getElementById("addTaskModal");
    if(modal) {
      this.addTask = new bootstrap.Modal(modal, {
        keyboard: true
      });
    }
    this.addTask?.show();
  }

  close(hideCall: boolean = false) {
    this.cardsService.activeModal.next("");
    if(hideCall && this.addTask !== undefined) this.addTask?.hide();

    this.cardsService.modifyingCardId = -1;
    this.cardsService.modifyingTaskId = -1;
  }

  private buildForm(initial?:Task){
    this.form = this.formBuilder.group({
    name: [initial?.name === undefined ? '' : initial?.name, [Validators.required]],
    description: [initial?.description === undefined ? '' : initial?.description]
    })
  }

  add() {
    this.form.markAllAsTouched();

    if(this.form.invalid) return;

    let task: Task = {
      id: 0,
      ...this.form.value,
      color: "#DE356F"
    }

    if(this.modifying){
      this.updateTask(task);
    }else {
      this.cardsService.addTask(this.cardsService.modifyingCardId, task);
    }

    this.close(true);
  }

  updateTask(newTask: Task){
    this.cardsService.cards[this.cardsService.modifyingCardId].tasks[this.cardsService.modifyingTaskId] = newTask;
    this.cardsService.organizeIds();
  }

  get invalidName(){
    return this.form.get('name')?.touched && this.form.get('name')?.invalid;
  }
}
