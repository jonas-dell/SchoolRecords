import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}
  register(user: any) {
    return this.http.post(`https://localhost:44352/api/User/register`, user);
    //return of({
     // successful: true,
      //message: 'Usuário salvo com sucesso!',
      //data: {},
    //}).pipe(delay(5000));
  }
}
