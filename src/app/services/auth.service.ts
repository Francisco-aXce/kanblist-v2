import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // userData: any = null;

  constructor(
    private auth: AngularFireAuth
  ) { }

  logInWithGoogle() {
    return this.auth.signInWithPopup(new GoogleAuthProvider());
  }

  logOut() {
    return this.auth.signOut();
  }

  // saveUserData(user: any) {
  //   if(user) {
  //     this.userData = {
  //       name: user.displayName,
  //       profileImg: user.photoURL
  //     };
  //   }else{
  //     this.userData = null;
  //   }
  // }

  getUser() {
    return this.auth.authState;
  }

  currentUser() {
    return this.auth.currentUser;
  }
}
