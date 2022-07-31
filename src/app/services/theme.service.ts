import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = new BehaviorSubject<boolean>(false);

  public getDarkMode(): Observable<boolean>{
    return this.darkMode.asObservable()
  }

  public toggleDarkMode(newDarkMode: boolean): void{
    this.darkMode.next(newDarkMode)
  }
  constructor() { }
}
