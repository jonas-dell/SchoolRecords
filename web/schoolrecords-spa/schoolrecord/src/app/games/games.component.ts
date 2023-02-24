import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { GamesService } from './games.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css'],
})
export class GamesComponent implements OnInit {
  page: number = 1;
  pageSize: number = 6;
  lastScroll: number = 0;
  loading: boolean = false;
  gamesLoaded: boolean = false;
  games: Array<any> = new Array<any>();

  constructor(private gamesService: GamesService) {
    this.loadGames();
  }

  ngOnInit(): void {}

  onScroll(e: any) {
    if (this.loading) return;
    let currentScroll = e.target.scrollTop;

    if (currentScroll > 0 && this.lastScroll <= currentScroll) {
      this.lastScroll = currentScroll;
      this.page++;
    } else this.lastScroll = currentScroll;

    this.loadGames();
  }

  private loadGames() {
    if (this.loading !== false || this.gamesLoaded !== false) return;
    this.loading = true;
    this.gamesService
      .getGames({ pageSize: this.pageSize, page: this.page })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showGamesLoadedMessage('gamesLoaded');
          return true;
        })
      )
      .subscribe((resp: Array<any>) => {
        this.games = [...this.games, ...resp];
      });
  }

  private showGamesLoadedMessage(controller: string) {
    this[controller] = true;
    timer(5000).subscribe(() => {
      this[controller] = false;
    });
  }
}
