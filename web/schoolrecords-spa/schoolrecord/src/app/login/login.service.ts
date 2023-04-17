import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResponse } from '../shared/responses/request-response';
import { ConfigService } from './../core/config/config.services';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  login(user: any): Observable<RequestResponse> {
    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/login/login`,
      user
    );
  }

  loginWindowsAuthentication(): Observable<RequestResponse> {
    return this.http.get<RequestResponse>(
      `${this.configService.config.apiUrl}/api/login/loginWindowsAuthentication`,
      { withCredentials: true }
    );
  }
}
