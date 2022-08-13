import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Location } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { CookieServiceWrapperService } from 'src/app/services/cookie-service-wrapper.service';
import { AuthService } from 'src/app/services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { WishlistService } from 'src/app/services/wishlist.service';

@UntilDestroy()
@Component({
  selector: 'app-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss'],
})
export class DrawerComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('drawer') public sidenav!: MatSidenav;
  darkMode = false;
  desktopWidth = 900;
  desktopMode = true;
  selectedLanguageFlag!: string;
  flagList = ['gb', 'de'];
  languageList!: string[];
  languageSelectorVisibility: boolean = false;
  favourite: boolean = false;
  imageError: boolean = false;

  constructor(
    private drawerService: NavigationDrawerService,
    private desktopModeService: DesktopModeService,
    private themeService: ThemeService,
    private router: Router,
    private location: Location,
    private cookieService: CookieServiceWrapperService,
    private translator: TranslateService,
    public authService: AuthService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.languageList = this.translator.getLangs();
    this.selectedLanguageFlag =
      this.flagList[this.languageList.indexOf(this.translator.currentLang)];
    this.themeService
      .getDarkMode()
      .pipe(untilDestroyed(this))
      .subscribe((darkMode) => (this.darkMode = darkMode));
    this.desktopModeService
      .getDesktopModeStatus()
      .pipe(untilDestroyed(this))
      .subscribe((mode) => {
        this.desktopMode = mode;
      });
  }

  ngAfterViewInit(): void {
    this.drawerService.setSidenav(this.sidenav);
    this.isFavouriteSub();
  }

  toogleDarkMode(): void {
    this.themeService.setDarkMode(!this.darkMode);
  }

  isGameView() {
    return this.router.url.match('^/search/.*$');
  }

  backButton() {
    this.location.back();
  }

  setLanguage(lang: string) {
    this.translator.use(lang);
    this.selectedLanguageFlag = this.flagList[this.languageList.indexOf(lang)];
    this.cookieService.set('language', lang + '');
  }

  toggleLanguageSelector() {
    this.languageSelectorVisibility = !this.languageSelectorVisibility;
  }

  closeLanguageSelector() {
    this.languageSelectorVisibility = false;
  }

  isFavouriteSub() {
    let gameId = parseInt(this.router.url.slice(8));
    this.wishlistService
      .getFavouriteCache()
      .pipe(untilDestroyed(this))
      .subscribe((state) => {
        this.favourite = state;
      });
  }

  onFavouriteClick() {
    let gameId = parseInt(this.router.url.slice(8));
    this.favourite = !this.favourite;
    this.wishlistService
      .setFavouriteState(gameId, this.favourite)
      ?.pipe(untilDestroyed(this))
      .subscribe((res) => {
        console.log('sent');
      });
  }

  imageErrorHandler(event: any) {
    this.imageError = true;
    event.target.src = '../../../assets/icons/default_profile.png';
  }

  ngOnDestroy(): void {}
}
