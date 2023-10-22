import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { PublicationService } from './publication.service';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {

  page: number = 1;
  pageSize: number = 5;
  lastScroll: number = 0;
  loading: boolean = false;
  publicationsLoaded: boolean = false;
  publications: Array<any> = new Array<any>();

  constructor(private publicationService: PublicationService) { 
    this.loadPublications();
  }

  ngOnInit(): void {
  }

  onScroll(e: any) {
    if (this.loading) return;
    let currentScroll = e.target.scrollTop;

    if (currentScroll > 0 && this.lastScroll <= currentScroll) {
      this.lastScroll = currentScroll;
      this.page++;
    } else this.lastScroll = currentScroll;

    this.loadPublications();
  }

  private loadPublications() {
    if (this.loading !== false || this.publicationsLoaded !== false) return;
    this.loading = true;
    this.publicationService
      .getPublications({ pageSize: this.pageSize, page: this.page })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showPublicationsLoadedMessage('publicationsLoaded');
          return true;
        })
      )
      .subscribe((resp: Array<any>) => {
        this.publications = [...this.publications, ...resp];
      });
  }

  private showPublicationsLoadedMessage(controller: string) {
    this[controller] = true;
    timer(5000).subscribe(() => {
      this[controller] = false;
    });
  }

}
