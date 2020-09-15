import {Injectable} from '@angular/core';
import {Observable, fromEvent} from 'rxjs';
import {filter} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',

})
export class KeyboardService {
  arrowEvent: Observable<Event>;

  constructor() {
    this.arrowEvent = fromEvent(document, 'keydown')
      .pipe(
        filter(
          (key: KeyboardEvent) => {
            return key.code === 'ArrowLeft'
              || key.code === 'ArrowRight'
              || key.code === 'ArrowUp'
              || key.code === 'ArrowDown' ;
          }));
  }
}
