import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { InvitesService } from './invitation.service';
@Component({
  selector: 'invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.css'],
})
export class InvitesComponent implements OnInit {
  page: number = 1;
  pageSize: number = 10;
  lastScroll: number = 0;
  loading: boolean = false;
  invitesLoaded: boolean = false;
  invites: Array<any> = new Array<any>();

  constructor(private invitesService: InvitesService) {
    this.loadInvites();
  }

  ngOnInit(): void {}

  onScroll(e: any) {
    if (this.loading) return;
    let currentScroll = e.target.scrollTop;

    if (currentScroll > 0 && this.lastScroll <= currentScroll) {
      this.lastScroll = currentScroll;
      this.page++;
    } else this.lastScroll = currentScroll;

    this.loadInvites();
  }

  private loadInvites() {
    if (this.loading !== false || this.invitesLoaded !== false) return;
    this.loading = true;
    this.invitesService
      .getInvites({ pageSize: this.pageSize, page: this.page })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showInvitesLoadedMessage('invitesLoaded');
          return true;
        })
      )
      .subscribe((resp: Array<any>) => {
        this.invites = [...this.invites, ...resp];
      });
  }

  private showInvitesLoadedMessage(controller: string) {
    this[controller] = true;
    timer(5000).subscribe(() => {
      this[controller] = false;
    });
  }
}
