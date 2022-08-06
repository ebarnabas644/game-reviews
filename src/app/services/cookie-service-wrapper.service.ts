import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieServiceWrapperService {

  private cookieConsent: boolean = false

  constructor(private cookieService: CookieService) {
    let consentStatus = this.cookieService.get("cookieconsent_status")
    if(consentStatus == "allow"){
      this.setCookieConsent(true)
    }
    else{
      this.setCookieConsent(false)
    }
   }

  setCookieConsent(newConsent: boolean){
    this.cookieConsent = newConsent
  }

  set(key: string, value: string){
    if(this.cookieConsent){
      this.cookieService.set(key, value, { path: "/"})
    }
  }

  get(key: string): string{
    if(this.cookieConsent){
      return this.cookieService.get(key)
    }
    return ""
  }

  deleteAll(){
    this.cookieService.deleteAll()
  }

  delete(key: string){
    this.cookieService.delete(key)
  }
}
