import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from 'src/app/shared/responses/request-response';

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {
  constructor(
    private http: HttpClient,
    private configService: ConfigService 
  ) { }

  consultaCep(cep:any){
    return this.http.get<RequestResponse>(
      `${this.configService.config.apiUrl}/api/ConsultaCep/ConsultaCep/${cep}`,
      cep
    );
  }
}
