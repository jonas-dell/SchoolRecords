import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { ConvertBase64 } from 'src/app/shared/services/perfil-data-utils.service';
import { ContactService } from './contact.service';

@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  page: number = 1;
  pageSize: number = 5;
  lastScroll: number = 0;
  loading: boolean = false;
  contactsLoaded: boolean = false;
  noContacts: boolean = false;
  contacts: Array<any> = new Array<any>();

  constructor(
    public convertBase64: ConvertBase64,
    public contactService: ContactService
  ) {
    this.loadContacts();
  }

  ngOnInit(): void {}

  onScroll(e: any) {
    if (this.loading) return;
    let currentScroll = e.target.scrollTop;

    if (currentScroll > 0 && this.lastScroll <= currentScroll) {
      this.lastScroll = currentScroll;
      this.page = this.page + this.pageSize;
    } else this.lastScroll = currentScroll;

    this.loadContacts();
  }

  private loadContacts() {
    if (this.loading !== false || this.contactsLoaded !== false) return;
    this.loading = true;
    this.contactService
      .getContacts({ pageSize: this.pageSize, page: this.page })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showContactsLoadedMessage('contactsLoaded');
          this.noContacts = true; 
          return true;
        })
      )
      .subscribe((resp: any) => {
        this.contacts = [...this.contacts, ...resp];
      });
  }

  private showContactsLoadedMessage(controller: string) {
    this[controller] = true;
    timer(5000).subscribe(() => {
      this[controller] = false;
    });
  }
}
