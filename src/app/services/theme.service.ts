import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private darkMode = new Subject<boolean>();

  public getDarkMode(): Observable<boolean>{
    return this.darkMode.asObservable()
  }

  public toggleDarkMode(newDarkMode: boolean): void{
    this.darkMode.next(newDarkMode)
  }
  constructor() { }
}
