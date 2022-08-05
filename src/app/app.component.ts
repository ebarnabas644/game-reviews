import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DesktopModeService } from './services/desktop-mode.service';
import { ThemeService } from './services/theme.service';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'game-reviews';
  desktopWidth = 900;
  darkMode = false

  private popupOpenSubscription!: Subscription;
  private popupCloseSubscription!: Subscription;
  private initializingSubscription!: Subscription;
  private initializedSubscription!: Subscription;
  private initializationErrorSubscription!: Subscription;
  private statusChangeSubscription!: Subscription;
  private revokeChoiceSubscription!: Subscription;
  private noCookieLawSubscription!: Subscription;

  constructor(private desktopModeService: DesktopModeService, private themeService: ThemeService, private translate: TranslateService, private cookieService: CookieService, private ccService: NgcCookieConsentService){
  }

  ngOnInit(): void{
    this.translate.addLangs(['en-GB', 'de-DE']);
    this.translate.setDefaultLang('en-GB');
    this.themeService.getDarkMode().subscribe(darkMode => this.darkMode = darkMode)
    let cookieLanguage = this.cookieService.get("language")
    if(cookieLanguage != ""){
      this.translate.use(cookieLanguage)
    }
    //this.cookieService.deleteAll()

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        console.log(event.status)
      });
  }

  ngAfterViewInit(): void{
    this.checkDesktopMode()
  }

  onResize(event: any) {
    this.checkDesktopMode()
  }

  checkDesktopMode(): void{
    if(window.innerWidth > this.desktopWidth){
      this.desktopModeService.setDesktopModeStatus(true)
      console.log("Global desktop status set: true")
    }
    else{
      this.desktopModeService.setDesktopModeStatus(false)
      console.log("Global desktop status set: false")
    }
  }

  ngOnDestroy(): void {
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializingSubscription.unsubscribe();
    this.initializedSubscription.unsubscribe();
    this.initializationErrorSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }
}
