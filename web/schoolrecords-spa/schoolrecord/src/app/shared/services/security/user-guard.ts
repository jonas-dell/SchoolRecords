import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { CurrentUserService } from '../current-user.service';

@Injectable({ providedIn: 'root' })
export class UserGuard implements CanActivate {
  constructor(
    private router: Router,
    private currentUserService: CurrentUserService
  ) {}
  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ) : | boolean {//| UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> 
      const token = window.localStorage.getItem('token');

      if(token){
        return true;
      }else{
        this.router.navigate(['login']);
        return false;
      }
      // if (!this.currentUserService.isLoggedUser()) {
      //   this.router.navigate(['login']);
      //   return false;
      // }
      // return true;
    }
}
