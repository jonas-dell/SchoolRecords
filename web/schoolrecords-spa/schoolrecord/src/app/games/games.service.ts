import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import games from '../data/games.json';

@Injectable({ providedIn: 'root' })
export class GamesService {
  gamesDb: Array<any> = new Array<any>();

  constructor() {
    this.gamesDb = games;
  }

  getGames({ pageSize, page }) {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let gamesFiltered = this.gamesDb.slice(skip, take);
    return of(gamesFiltered).pipe(delay(500));
  }
}
