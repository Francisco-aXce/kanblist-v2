import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectsService } from '../services/projects.service';

@Injectable({
  providedIn: 'root'
})
export class ContentGuard implements CanActivate {

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return new Promise((resolve) => {
      this.auth.authState.subscribe(resp => {
        if(resp !== null && route.paramMap.get('id')){
          return resolve(true);
        }else {
          this.router.navigate(['home']);
          return resolve(false);
        }
      });
    });
  }
}
