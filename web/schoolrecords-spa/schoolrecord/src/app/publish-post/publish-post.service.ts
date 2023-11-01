import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/core/config/config.services';
import { RequestResponse } from 'src/app/shared/responses/request-response';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient,private configService: ConfigService) {}

  postInsert(data: any){
    return this.http.post<RequestResponse>(
      `${this.configService.config.apiUrl}/api/UserPost/AddPost`,
      data
    );
  }

}
