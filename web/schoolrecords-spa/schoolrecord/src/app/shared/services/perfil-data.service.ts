import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from '../responses/request-response';

@Injectable({
  providedIn: 'root',
})
export class PerfilDataService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  uploadImage(image: File) {
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/Perfil/UpdateFoto`,
      formData
    );
  }

  getPerfil() {
    return this.http.get<RequestResponse>(
      `${this.configService.config.apiUrl}/api/Perfil/GetUserPerfil`
    );
  }
}
