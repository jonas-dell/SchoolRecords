import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
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
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.currentUserService.isLoggedUser()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
