import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from 'src/app/shared/responses/request-response';

@Injectable({
  providedIn: 'root',
})
export class CoverPhotoService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  getPerfil() {
    return this.http.get<RequestResponse>(
      `${this.configService.config.apiUrl}/api/perfil/getUserPerfil`
    );
  }

  atualizarImagem(image: File) {
    console.log(image);
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/Perfil/UpdateImagem`,
      formData
    );
  }
}

export class ImageUpdateService {
  private imageUpdatedSource = new Subject<void>();
  imageUpdated$ = this.imageUpdatedSource.asObservable();
  updateImage() {
    this.imageUpdatedSource.next();
  }
}
