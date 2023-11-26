import { Injectable } from '@angular/core';
import { RequestResponse } from '../shared/responses/request-response';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './../core/config/config.services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) { }


  deleteUser(id: number): Observable<RequestResponse> {
    return this.http.delete<RequestResponse>(
      `${this.configService.config.apiUrl}/api/user/deleteUser/${id}`
    );
  }

}
