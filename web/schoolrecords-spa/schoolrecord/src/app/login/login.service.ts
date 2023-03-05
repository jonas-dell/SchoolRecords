import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './../core/config/config.services';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  login(user: any) {
    return this.http.post(
      `${this.configService.config.apiUrl}/api/login/login`,
      user
    );
  }
}
