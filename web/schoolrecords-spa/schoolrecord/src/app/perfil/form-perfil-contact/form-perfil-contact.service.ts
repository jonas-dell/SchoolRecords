import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from 'src/app/shared/responses/request-response';

@Injectable({
  providedIn: 'root'
})
export class FormPerfilContactService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }


  salvarContact(data: any){
    console.log('data', data);
    return this.http.put<RequestResponse>(
      `${this.configService.config.apiUrl}/api/Contact/UpdateContact`,
      data
    );
  }
}
