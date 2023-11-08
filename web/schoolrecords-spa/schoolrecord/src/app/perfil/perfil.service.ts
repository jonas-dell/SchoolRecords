import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RequestResponse } from '../shared/responses/request-response';
import { ConfigService } from './../core/config/config.services';
import { CurrentUserService } from '../shared/services/current-user.service';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PerfilService {
  private contactsFetched = false;

  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private currentUserService: CurrentUserService
  ) {}

  getPerfil() {
    return this.http.get<RequestResponse>(
      `${this.configService.config.apiUrl}/api/perfil/getUserPerfil`
    );
  }

  getContactsConnections() {
    if (!this.contactsFetched) {
      let user = this.currentUserService.getCurrentUser();

      return this.http
        .get<any>(
          `${this.configService.config.apiUrl}/api/user/GetContactsById?id=${user?.id}`
        )
        .pipe(tap(() => (this.contactsFetched = true)));
    }
    return of([]);
  }
}
