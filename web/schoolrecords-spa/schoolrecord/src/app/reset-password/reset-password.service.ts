import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../core/config/config.services';
import { RequestResponse } from '../shared/responses/request-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  updatePassword(newPassword: string): Observable<RequestResponse> {
    return this.http.put<RequestResponse>(
      `${this.configService.config.apiUrl}/api/ForgotPassword/UpdatePassword`,
      {newPassword: newPassword}
    );
  }
}
