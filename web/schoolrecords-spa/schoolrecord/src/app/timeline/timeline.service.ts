import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import pubs from '../data/pub.json';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../core/config/config.services';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TimelineService {
  pubsDb: Array<any> = new Array<any>();

  constructor(private http: HttpClient,private configService: ConfigService) {
    this.pubsDb = pubs;
  }

  getListPost({ }): Observable<any> {
    return this.http.get<any>(
      `${this.configService.config.apiUrl}/api/UserPost/GetListPost`
    );
  }

  getPubs() {
    return interval(7000).pipe(
      map(() => {
        let result: Array<any> = new Array<any>();
        result.push(this.pubsDb[Math.floor(Math.random() * (1 - 0 + 1)) + 0]);
        result.push(this.pubsDb[Math.floor(Math.random() * (3 - 2 + 1)) + 2]);
        result.push(this.pubsDb[Math.floor(Math.random() * (5 - 4 + 1)) + 4]);

        return result;
      })
    );
  }
}
