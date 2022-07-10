import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //user: User | null = null;

  constructor(
    private auth: AngularFireAuth
  ) { }

  logInWithGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider());
  }

  logOut() {
    return this.auth.signOut();
  }

  getUser() : Observable<any> {
    return this.auth.authState;
  }

  currentUser() {
    return this.auth.currentUser;
  }
}
