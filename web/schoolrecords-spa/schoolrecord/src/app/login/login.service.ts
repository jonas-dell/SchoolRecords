import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginService {
  constructor(private http: HttpClient) {}

  login(user: any) {
    return this.http.post(`https://localhost:44352/weatherforecast`, user);
    // return of({
    //   successful: true,
    //   message: 'Usuário autenticado com sucesso',
    //   data: {},
    // }).pipe(delay(5000));
  }
}
