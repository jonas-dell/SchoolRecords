import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import invites from '../data/invites.json';

@Injectable({ providedIn: 'root' })
export class InvitesService {
  invitesDb: Array<any> = new Array<any>();

  constructor() {
    this.invitesDb = invites;
  }

  getInvites({ pageSize, page }) {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let invitesFiltered = this.invitesDb.slice(skip, take);
    return of(invitesFiltered).pipe(delay(500));
  }
}
