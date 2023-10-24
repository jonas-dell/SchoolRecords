import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
  private _user: any;

  setCurrentUser(user: any) {
    this._user = user;
    window.localStorage.setItem('user', JSON.stringify(this._user));
  }

  getCurrentUser(): User | null {
    if (!this._user && !window.localStorage.getItem('user')) return null;
    return !!this._user
      ? this._user
      : JSON.parse(window.localStorage.getItem('user') as string);
  }

  isLoggedUser(): boolean {
    return (
      !!this._user ||
      !!JSON.parse(window.localStorage.getItem('user') as string)
    );
  }
}
