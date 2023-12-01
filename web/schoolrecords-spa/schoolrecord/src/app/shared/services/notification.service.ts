import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  constructor() {}

  errorFields() {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Fill in the fields correctly!',
    });
  }

  error(errorMessage: string) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: errorMessage,
    });
  }

  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
    });
  }
}
