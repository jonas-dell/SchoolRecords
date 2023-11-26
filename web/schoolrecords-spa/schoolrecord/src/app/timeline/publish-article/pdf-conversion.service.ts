import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfConversionService {

  constructor() { }

  convertToBase64(file: File): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onloadend = () => {
        observer.next(reader.result as string);
        observer.complete();
      };

      reader.onerror = (error) => {
        observer.error(error);
      };
    });
  }
}
