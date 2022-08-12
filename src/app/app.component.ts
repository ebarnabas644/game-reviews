import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DesktopModeService } from './services/desktop-mode.service';
import { ThemeService } from './services/theme.service';
import { NgcCookieConsentService, NgcStatusChangeEvent } from 'ngx-cookieconsent';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { CookieServiceWrapperService } from './services/cookie-service-wrapper.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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

  constructor(private desktopModeService: DesktopModeService, private themeService: ThemeService, private translate: TranslateService, private cookieService: CookieServiceWrapperService, private ccService: NgcCookieConsentService){
  }

  ngOnInit(): void{
    this.translate.addLangs(['en-GB', 'de-DE']);
    this.translate.setDefaultLang('en-GB');
    this.themeService.getDarkMode().subscribe(darkMode => this.darkMode = darkMode)
    let cookieLanguage = this.cookieService.get("language")
    if(cookieLanguage != ""){
      this.translate.use(cookieLanguage)
    }
    else{
      this.translate.use(this.translate.defaultLang)
    }
    //this.cookieService.deleteAll()
    this.setCookieConsentPopupLabels()

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        console.log(event.status)
        if(event.status == "allow"){
          this.cookieService.setCookieConsent(true)
        }
        else{
          this.cookieService.setCookieConsent(false)
          this.cookieService.deleteAll()
        }
      });
  }

  ngAfterViewInit(): void{
    this.checkDesktopMode()
  }

  setCookieConsentPopupLabels(){
    this.translate//
      .stream(['cookie.header', 'cookie.message', 'cookie.dismiss', 'cookie.allow', 'cookie.deny', 'cookie.link', 'cookie.policy']).pipe(untilDestroyed(this))
      .subscribe(data => {

        this.ccService.getConfig().content = this.ccService.getConfig().content || {} ;
        // Override default messages with the translated ones
        this.ccService.getConfig().content!.header = data['cookie.header'];
        this.ccService.getConfig().content!.message = data['cookie.message'];
        this.ccService.getConfig().content!.dismiss = data['cookie.dismiss'];
        this.ccService.getConfig().content!.allow = data['cookie.allow'];
        this.ccService.getConfig().content!.deny = data['cookie.deny'];
        this.ccService.getConfig().content!.link = data['cookie.link'];
        this.ccService.getConfig().content!.policy = data['cookie.policy'];

        this.ccService.destroy(); // remove previous cookie bar (with default messages)
        this.ccService.init(this.ccService.getConfig()); // update config with translated messages
      });
  }

  onResize(event: any) {
    this.checkDesktopMode()
  }

  checkDesktopMode(): void{
    if(window.innerWidth > this.desktopWidth){
      this.desktopModeService.setDesktopModeStatus(true)
    }
    else{
      this.desktopModeService.setDesktopModeStatus(false)
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
