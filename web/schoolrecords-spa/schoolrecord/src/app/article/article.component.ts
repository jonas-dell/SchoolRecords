import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import { skipWhile, tap } from 'rxjs/operators';
import { ArticleService } from './article.service';

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
  articlesLoaded: boolean = false;
  articles: Array<any> = new Array<any>();

  constructor(private articleService: ArticleService) {
    this.loadArticles();
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

    this.loadArticles();
  }

  private loadArticles() {
    if (this.loading !== false || this.articlesLoaded !== false) return;
    this.loading = true;
    this.articleService
      .getArticles({ pageSize: this.pageSize, page: this.page })
      .pipe(
        tap(() => (this.loading = false)),
        skipWhile((resp) => {
          if (resp.length !== 0) return false;
          this.showArticlesLoadedMessage('articlesLoaded');
          return true;
        })
      )
      .subscribe((resp: Array<any>) => {
        this.articles = [...this.articles, ...resp];
      });
  }

  private showArticlesLoadedMessage(controller: string) {
    this[controller] = true;
    timer(5000).subscribe(() => {
      this[controller] = false;
    });
  }

}
