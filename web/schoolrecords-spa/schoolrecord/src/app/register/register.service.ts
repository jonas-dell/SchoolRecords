import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../core/config/config.services';
import { RequestResponse } from '../shared/responses/request-response';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  register(data: any): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/login/register`,
      data
    );
  }
}
