import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.services';

@Injectable({
  providedIn: 'root'
})
export class PublishArticleService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  uploadFormData(formData: FormData): Observable<any> {
    formData.forEach((value, key) => {
      console.log(`Chave: ${key}, Valor: ${value}`);
    });
    return this.http.post(`${this.configService.config.apiUrl}/api/UserPost/uploadpdf`, formData);
  }
}