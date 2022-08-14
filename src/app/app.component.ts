import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { DesktopModeService } from './services/desktop-mode.service';
import { ThemeService } from './services/theme.service';
import {
  NgcCookieConsentService,
  NgcStatusChangeEvent,
} from 'ngx-cookieconsent';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { filter, Subscription } from 'rxjs';
import { CookieServiceWrapperService } from './services/cookie-service-wrapper.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'game-reviews';
  desktopWidth = 900;
  darkMode = false;

  private titleSub!: Subscription;

  constructor(
    private desktopModeService: DesktopModeService,
    private themeService: ThemeService,
    private translate: TranslateService,
    private cookieService: CookieServiceWrapperService,
    private ccService: NgcCookieConsentService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.translate.addLangs(['en-GB', 'de-DE']);
    this.translate.setDefaultLang('en-GB');
    this.themeService
      .getDarkMode()
      .subscribe((darkMode) => (this.darkMode = darkMode));
    let cookieLanguage = this.cookieService.get('language');
    if (cookieLanguage != '') {
      this.translate.use(cookieLanguage);
    } else {
      this.translate.use(this.translate.defaultLang);
    }
    //this.cookieService.deleteAll()
    this.setCookieConsentPopupLabels();

    this.ccService.statusChange$
      .pipe(untilDestroyed(this))
      .subscribe((event: NgcStatusChangeEvent) => {
        console.log(event.status);
        if (event.status == 'allow') {
          this.cookieService.setCookieConsent(true);
        } else {
          this.cookieService.setCookieConsent(false);
          this.cookieService.deleteAll();
        }
      });

    this.titleChangeOnRouteSubscribe();
  }

  titleChangeOnRouteSubscribe() {
    //https://www.tektutorialshub.com/angular/dynamic-page-title-based-on-route-in-angular/
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        var rt = this.getChild(this.activatedRoute);

        rt.data
          .pipe(untilDestroyed(this))
          .subscribe((data: { title: string }) => {
            if (data.title != undefined) {
              this.subscribeToTitleTranslation(data.title);
            }
          });
      });
  }

  subscribeToTitleTranslation(title: string) {
    this.unsubscribeTitle();
    this.titleSub = this.translate
      .stream(title)
      .pipe(untilDestroyed(this))
      .subscribe((title) => {
        this.titleService.setTitle(title);
      });
  }

  unsubscribeTitle() {
    if (this.titleSub != undefined) {
      this.titleSub.unsubscribe();
    }
  }

  ngAfterViewInit(): void {
    this.checkDesktopMode();
  }

  setCookieConsentPopupLabels() {
    this.translate //
      .stream([
        'cookie.header',
        'cookie.message',
        'cookie.dismiss',
        'cookie.allow',
        'cookie.deny',
        'cookie.link',
        'cookie.policy',
      ])
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.ccService.getConfig().content =
          this.ccService.getConfig().content || {};
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
    this.checkDesktopMode();
  }

  checkDesktopMode(): void {
    if (window.innerWidth > this.desktopWidth) {
      this.desktopModeService.setDesktopModeStatus(true);
    } else {
      this.desktopModeService.setDesktopModeStatus(false);
    }
  }

  getChild(activatedRoute: ActivatedRoute): any {
    if (activatedRoute.firstChild) {
      return this.getChild(activatedRoute.firstChild);
    } else {
      return activatedRoute;
    }
  }

  ngOnDestroy(): void {}
}
