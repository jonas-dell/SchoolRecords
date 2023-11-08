import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private imageUpdated = new BehaviorSubject<void>(undefined);

  getImageUpdatedObservable(): Observable<void> {
    return this.imageUpdated.asObservable();
  }

  updateImage() {
    this.imageUpdated.next();
  }
}
