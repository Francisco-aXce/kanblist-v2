import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  authState$ = this.authService.getUser();

  ngOnInit(): void {
    // this.authService.getUser().subscribe(resp => {
    //   this.authService.saveUserData(resp);
    // })
  }

  onLogin() {
    this.authService.logInWithGoogle().then(() => {
      console.log("Login success");
    }).catch(error => {
      console.error(error);
    });
  }

  onLogout() {
    this.authService.logOut().then(() => {
      console.log("Logout");
    }).catch(error => {
      console.error(`Error on logout: ${error}`);
    })
  }
}
