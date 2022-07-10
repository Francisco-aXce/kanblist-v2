import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  authState$ = this.authService.getUser();

  ngOnInit(): void {

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
      this.router.navigate(['home']);
    }).catch(error => {
      console.error(`Error on logout: ${error}`);
    })
  }

  // Validate if i'm in the projects page
  get onProjectsPage() {
    return this.router.url === '/projects';
  }

}
