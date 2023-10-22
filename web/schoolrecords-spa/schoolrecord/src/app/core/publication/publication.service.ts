import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import publications from '../../data/publications.json';

@Injectable({ providedIn: 'root' })
export class PublicationService {
  publicationsDb: Array<any> = new Array<any>();

  constructor() {
    this.publicationsDb = publications;
  }

  getPublications({ pageSize, page }) {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let publicationsFiltered = this.publicationsDb.slice(skip, take);
    return of(publicationsFiltered).pipe(delay(1000));
  }
}
