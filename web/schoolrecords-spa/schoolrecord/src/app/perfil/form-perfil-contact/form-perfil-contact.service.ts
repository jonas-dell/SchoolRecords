import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from 'src/app/shared/responses/request-response';

@Injectable({
  providedIn: 'root'
})
export class FormPerfilContactService {
  private perfilDataSubject = new BehaviorSubject<any>(null);
  perfilData$ = this.perfilDataSubject.asObservable();

  updatePerfilData(data: any) {
    this.perfilDataSubject.next(data);
  }


  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }


  salvarContact(data: any) {
    console.log('data', data);
    return this.http.put<RequestResponse>(
      `${this.configService.config.apiUrl}/api/Contact/UpdateContact`,
      data
    );
  }
}
