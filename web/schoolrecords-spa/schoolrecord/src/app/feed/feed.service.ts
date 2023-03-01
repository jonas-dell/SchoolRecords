import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';
import pubs from '../data/pub.json';

@Injectable({ providedIn: 'root' })
export class FeedService {
  pubsDb: Array<any> = new Array<any>();

  constructor(private http: HttpClient) {
    this.pubsDb = pubs;
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

  getWeatherforecast() {
    // this.http.get('https://localhost:44352/weatherforecast').subscribe(
    //   (resp) => {
    //     console.log('data', resp);
    //   },
    //   (error) => {
    //     console.log('Error');
    //     alert(error?.message);
    //   }
    // );

    this.http
      .post(`https://localhost:44352/weatherforecast`, {
        nome: 'Adam AADFASDFASDFASDFASDFASDFA|SDFASDFSADF',
      })
      .subscribe((resp) => {
        console.log(resp);
      });
  }
}
