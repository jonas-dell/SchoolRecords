import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from 'src/app/shared/responses/request-response';

@Injectable({ providedIn: 'root' })
export class FormPerfilService {
  constructor(private http: HttpClient,private configService: ConfigService) {}

  salvarPerfil(data:any){
    return this.http.put<RequestResponse>(
      `${this.configService.config.apiUrl}/api/perfil/updatePerfil`,
      data
    );
  }

  


}
