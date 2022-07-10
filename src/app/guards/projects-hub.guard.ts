import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectsHubGuard implements CanActivate {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise((resolve) => {
        this.auth.authState.subscribe(resp => {
          if(resp !== null){
            return resolve(true);
          }else {
            this.router.navigate(['home']);
            return resolve(false);
          }
        });
      });
  }

}
