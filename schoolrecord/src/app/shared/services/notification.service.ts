import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() {}

  errorFields() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Preencha os campos corretamente!',
    });
  }
}
