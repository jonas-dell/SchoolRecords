import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from './config.model';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  private readonly configUrl: string = `../../../assets/config/config.json`;

  config: Config;

  constructor(private http: HttpClient) {
    this.config = new Config();
    this.load().subscribe((resp) => {
      this.config = resp;
    });
  }

  load() {
    return this.http.get<Config>(`${this.configUrl}`);
  }
}
