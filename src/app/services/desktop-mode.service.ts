import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesktopModeService {

  private desktopMode = new ReplaySubject<boolean>();

  public getDesktopModeStatus(): Observable<boolean>{
    return this.desktopMode.asObservable()
  }

  public setDesktopModeStatus(value: boolean): void{
    this.desktopMode.next(value)
  }

  constructor() {
   }
}
