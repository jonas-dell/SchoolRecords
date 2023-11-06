import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { NotificationService } from '../shared/services/notification.service';
import { ConvertBase64 } from '../shared/services/perfil-data-utils.service';
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
  noUsers: boolean = false;
  invites: Array<any> = new Array<any>();

  constructor(
    public convertBase64: ConvertBase64,
    private invitesService: InvitesService,
    private notificationService: NotificationService
  ) {
    this.loadInvites();
  }

  ngOnInit(): void {}

  sendInvite(contact: any) {
    this.invitesService.sendInvite(contact.id).subscribe(
      (resp) => {
        this.invites = [];
        this.loadInvites();
        this.notificationService.success('Contato adicionado com sucesso!');
      },
      (error) => {
        console.error('Erro ao buscar dados da api:', error);
      }
    );
  }

  private loadInvites() {
    this.invitesService
      .getInvites({ pageSize: this.pageSize, page: this.page })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showInvitesLoadedMessage('contactsLoaded');
          this.noUsers = true; 
          return true;
        })
      )
      .subscribe((resp: any) => {
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
