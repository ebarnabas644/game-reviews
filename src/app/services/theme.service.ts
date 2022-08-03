import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService{

  private darkMode = new BehaviorSubject<boolean>(false);

  public getDarkMode(): Observable<boolean>{
    return this.darkMode.asObservable()
  }

  public setDarkMode(newDarkMode: boolean): void{
    this.darkMode.next(newDarkMode)
    this.cookieService.set("darkMode", newDarkMode+"")
  }
  constructor(private cookieService: CookieService) {
    this.tryLoadDarkModeStateFromCookie()
   }

  tryLoadDarkModeStateFromCookie(){
    let cookieDarkMode = this.cookieService.get("darkMode")
    if(cookieDarkMode != ""){
      this.setDarkMode(cookieDarkMode === "true")
    }
  }
}
