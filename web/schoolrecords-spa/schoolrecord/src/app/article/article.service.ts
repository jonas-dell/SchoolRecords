import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import articles from '../data/articles.json';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/config/config.services';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  articlesDb: Array<any> = new Array<any>();

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    this.articlesDb = articles;
  }

  getArticles({ pageSize, page }) {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let articlesFiltered = this.articlesDb.slice(skip, take);
    return of(articlesFiltered).pipe(delay(1000));
  }


  getPdf(): Observable<Pdf[]> {
    return this.http.get<Pdf[]>(`${this.configService.config.apiUrl}/api/UserPost/getPdf`)
  }
}

export interface Pdf {
  id: number
  title: string,
  authors: string,
  day: string,
  month: string,
  year: string,
  numberPages: number,
  pdfFile: string,
}
