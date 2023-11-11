import { Injectable } from '@angular/core';
import { RequestResponse } from '../shared/responses/request-response';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../core/config/config.services';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }

}
