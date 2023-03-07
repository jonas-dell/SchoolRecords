import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../core/config/config.services';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  register(data: any) {
    return this.http.post(
      `${this.configService.config.apiUrl}/api/login/register`,
      data
    );
  }
}
