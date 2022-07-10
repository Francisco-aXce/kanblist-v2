import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ModalInfo } from '../models/modalInfo.model';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  activeModal = new BehaviorSubject<ModalInfo>({type: ''});

  activeModal$ = this.activeModal.asObservable();

  constructor() { }

  open(modal: ModalInfo) {
    this.activeModal.next(modal);
  }
}
