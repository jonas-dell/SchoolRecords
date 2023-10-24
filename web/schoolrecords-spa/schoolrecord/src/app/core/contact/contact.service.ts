import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CurrentUserService } from 'src/app/shared/services/current-user.service';
import contacts from '../../data/contacts.json';
import { ConfigService } from '../config/config.services';

@Injectable({ providedIn: 'root' })
export class ContactService {
  contactsDb: Array<any> = new Array<any>();

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private currentUserService: CurrentUserService
  ) {
    this.contactsDb = contacts;
  }

  getContacts({ pageSize, page }) {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let contactsFiltered = this.contactsDb.slice(skip, take);
    return of(contactsFiltered).pipe(delay(1000));
  }

  getContactsTest({ pageSize, page }): Observable<any> {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let user = this.currentUserService.getCurrentUser();

    return this.http.get<any>(
      `${this.configService.config.apiUrl}/api/user/getContacts?id=${user?.id}&skip=${skip}&take=${take}`
    );
  }
}
