import { Injectable } from '@angular/core';
import { ConfigService } from './../core/config/config.services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestResponse } from '../shared/responses/request-response';

@Injectable({ providedIn: 'root' })
export class PerfilService {
  constructor(private http: HttpClient,private configService: ConfigService) {}

  uploadImage(image: File): Observable<RequestResponse> {
    const formData = new FormData();

    formData.append('image', image);

    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/perfil/imageUploadPerfil`, formData);
  }

  


}
