import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResponse } from '../shared/responses/request-response';
import { ConfigService } from './../core/config/config.services';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  uploadImage(image: File) {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/Perfil/UpdateFoto`,
      formData
    );
  }

  getPerfil() {
    return this.http.get<RequestResponse>(
      `${this.configService.config.apiUrl}/api/perfil/getUserPerfil`
    );
  }
}
