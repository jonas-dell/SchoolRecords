import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { ArticleService, Pdf } from './article.service';
import { ViewPdfComponent } from '../view-pdf/view-pdf.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  page: number = 1;
  pageSize: number = 12;
  lastScroll: number = 0;
  loading: boolean = false;
  pdfsLoaded: boolean = false;
  pdfs: Pdf[] = [];

  constructor(
    private articleService: ArticleService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.articleService.getPdf().subscribe(
      pdfs => {
        this.pdfs = pdfs;
        this.pdfsLoaded = true;
      },
      error => {
        console.error('Erro ao obter a lista de PDFs', error);
      }
    );
  }

  onScroll(e: any) {
    if (this.loading || this.pdfsLoaded) return;

    let currentScroll = e.target.scrollTop;

    if (currentScroll > 0 && this.lastScroll <= currentScroll) {
      this.lastScroll = currentScroll;
      this.page++;
      this.loadArticles();
    } else {
      this.lastScroll = currentScroll;
    }
  }

  private loadArticles() {
    this.loading = true;
    this.articleService
      .getArticles({ pageSize: this.pageSize, page: this.page })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showArticlesLoadedMessage('pdfsLoaded');
          return true;
        })
      )
      .subscribe((resp: Pdf[]) => {
        this.pdfs = [...this.pdfs, ...resp];
      });
  }

  private showArticlesLoadedMessage(controller: string) {
    this[controller] = true;
    timer(5000).subscribe(() => {
      this[controller] = false;
    });
  }

  viewPDF(pdfFile: string) {
    let dialogRef = this.dialog.open(ViewPdfComponent, {
      height: '650px',
      width: '950px',
      data: {
        pdfFile
      },
    });
  }

}
