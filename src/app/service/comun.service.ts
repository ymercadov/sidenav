import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ComunService {
  private toggleSubject = new BehaviorSubject<boolean>(false);
  toggle$ = this.toggleSubject.asObservable();

  takeValue(state: boolean) {
    console.log('1.valor desde el servicio:',state)
    this.toggleSubject.next(state);    
  }
}