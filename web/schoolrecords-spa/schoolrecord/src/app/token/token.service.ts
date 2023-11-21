import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ConfigService } from '../core/config/config.services';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { }

  getRecoveryToken(token: string): Observable<number> {
    const params = new HttpParams().set('token', token);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  
    return this.http.get<number>(
      `${this.configService.config.apiUrl}/api/RecoveryToken/GetRecoveryToken`,
      { headers, params}
    ).pipe(
      catchError((error) => {
        if(error.status === 404){
          return throwError(404);
        }
        console.error('Erro na solicitação HTTP', error);
        throw error; 
      })
    );
  }
}
