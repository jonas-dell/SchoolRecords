import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import articles from '../data/articles.json';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesDb: Array<any> = new Array<any>();

  constructor() { 
    this.articlesDb = articles;
  }

  getArticles({ pageSize, page }) {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let articlesFiltered = this.articlesDb.slice(skip, take);
    return of(articlesFiltered).pipe(delay(1000));
  }

}
