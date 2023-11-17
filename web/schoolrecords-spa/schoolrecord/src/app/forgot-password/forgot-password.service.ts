import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../core/config/config.services';
import { Observable } from 'rxjs';
import { RequestResponse } from '../shared/responses/request-response';

@Injectable({
  providedIn: 'root',
})
export class ForgotPasswordService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  sendRecoveryRequest(email: string): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/ForgotPassword/ForgotPassword`,
      { email: email }
    );
  }
}
