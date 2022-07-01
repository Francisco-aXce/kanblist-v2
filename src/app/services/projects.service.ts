import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Project } from './../models/project.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  projects: Project[] = [];

  // This is used to modify an specific project
  modifyingId: string = '';

  constructor(
    private db: AngularFirestore,
    private authService: AuthService
  ) { }

  getProjects(uId: string) {
    return this.db.collection('projects', ref => ref.where('owner', '==', uId)).snapshotChanges();
  }

  addProject(project: any) {
    return this.db.collection('projects').add(project);
  }

  // Return specific project of local array
  getProject(id: string) {
    return this.projects.find(project => project.id === id);
  }

  update(id: string, newData: Project) {
    return this.db.collection('projects').doc(id).update(newData);
  }

  delete(id: string) {
    return this.db.collection('projects').doc(id).delete();
  }
}
