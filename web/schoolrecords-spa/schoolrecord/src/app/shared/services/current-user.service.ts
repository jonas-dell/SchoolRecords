import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private _user: any;

  setCurrentUser(user: any) {
    this._user = user;
    window.localStorage.setItem('user', this._user);
  }

  getCurrentUser(): User {
    if (!this._user && !window.localStorage.getItem('user')) return new User();
    return !!this._user ? this._user : window.localStorage.getItem('user');
  }

  isLoggedUser(): boolean {
    return !!this._user || !window.localStorage.getItem('user');
  }
}
