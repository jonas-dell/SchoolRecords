import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from 'src/app/shared/responses/request-response';

@Injectable({ providedIn: 'root' })
export class FormPerfilJobService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  salvarJob(data: any) {
    return this.http.put<RequestResponse>(
      `${this.configService.config.apiUrl}/api/jobExperience/updateJobExperience`,
      data
    );
  }

  getJobExperience() {
    return this.http.get<RequestResponse>(
      `${this.configService.config.apiUrl}/api/jobExperience/getJobExperience`
    );
  }
}
