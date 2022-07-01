import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  activeModal = new BehaviorSubject<string>('');

  activeModal$ = this.activeModal.asObservable();

  constructor() { }

  open(modal: string) {
    this.activeModal.next(modal);
  }
}
