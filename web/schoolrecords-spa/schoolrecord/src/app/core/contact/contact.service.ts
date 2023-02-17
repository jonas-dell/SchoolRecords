import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import contacts from '../../data/contacts.json';

@Injectable({ providedIn: 'root' })
export class ContactService {
  contactsDb: Array<any> = new Array<any>();

  constructor() {
    this.contactsDb = contacts;
  }

  getContacts({ pageSize, page }) {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let contactsFiltered = this.contactsDb.slice(skip, take);
    return of(contactsFiltered).pipe(delay(1000));
  }
}
