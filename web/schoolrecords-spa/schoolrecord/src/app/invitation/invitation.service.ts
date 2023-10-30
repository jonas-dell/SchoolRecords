import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../core/config/config.services';
import { CurrentUserService } from '../shared/services/current-user.service';

@Injectable({ providedIn: 'root' })
export class InvitesService {
  constructor(
    private http: HttpClient,

    private configService: ConfigService,
    private currentUserService: CurrentUserService
  ) {}

  getInvites({ pageSize, page }): Observable<any> {
    let skip = (page - 1) * pageSize;
    let take = page * pageSize;
    let user = this.currentUserService.getCurrentUser();

    return this.http.get<any>(
      `${this.configService.config.apiUrl}/api/user/getInvites?id=${user?.id}&skip=${skip}&take=${take}`
    );
  }

  sendInvite(userId: number): Observable<any> {
    return this.http.post<any>(
      `${this.configService.config.apiUrl}/api/user/sendInvite`,
      userId
    );
  }
}
