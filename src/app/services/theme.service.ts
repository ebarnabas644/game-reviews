import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieServiceWrapperService } from './cookie-service-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{

  private darkMode = new BehaviorSubject<boolean>(false);

  constructor(private cookieService: CookieServiceWrapperService) {
    this.tryLoadDarkModeStateFromCookie()
   }

  public getDarkMode(): Observable<boolean>{
    return this.darkMode.asObservable()
  }

  public setDarkMode(newDarkMode: boolean): void{
    this.darkMode.next(newDarkMode)
    this.cookieService.set("darkMode", newDarkMode+"")
  }

  tryLoadDarkModeStateFromCookie(){
    let cookieDarkMode = this.cookieService.get("darkMode")
    if(cookieDarkMode != ""){
      this.setDarkMode(cookieDarkMode === "true")
    }
  }
}
