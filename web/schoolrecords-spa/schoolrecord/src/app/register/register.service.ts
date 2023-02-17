import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  register(user: any) {
    return of({
      successful: true,
      message: 'Usuário salvo com sucesso!',
      data: {},
    }).pipe(delay(5000));
  }
}
