import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav;
  darkMode = false
  desktopWidth = 900;
  desktopMode = true
  desktopStatusSubscription!: Subscription
  selectedLanguageFlag!: string
  flagList = ['gb','de']
  languageList!: string[]
  languageSelectorVisibility: boolean = false

  constructor(private drawerService: NavigationDrawerService, private desktopModeService: DesktopModeService, private themeService: ThemeService, private router: Router, private location: Location, private cookieService: CookieService, private translator: TranslateService) {
   }

  ngOnInit(): void {
    this.languageList = this.translator.getLangs()
    this.setLanguage(this.translator.defaultLang)
    console.log(this.languageList)
    this.themeService.getDarkMode().subscribe(darkMode => this.darkMode = darkMode)
    this.desktopStatusSubscription = this.desktopModeService
    .getDesktopModeStatus()
    .subscribe(mode => {
      this.desktopMode = mode
    })
  }

  ngAfterViewInit(): void{
    this.drawerService.setSidenav(this.sidenav)
  }

  toogleDarkMode(): void{
    this.themeService.setDarkMode(!this.darkMode)
  }

  ngOnDestroy(): void{
    this.desktopStatusSubscription.unsubscribe()
  }

  isGameView(){
    return this.router.url.match('^/search/.*$');
  }

  backButton(){
    this.location.back()
  }

  setLanguage(lang: string){
    this.translator.use(lang)
    this.selectedLanguageFlag = this.flagList[this.languageList.indexOf(lang)]
  }

  toggleLanguageSelector(){
    this.languageSelectorVisibility = !this.languageSelectorVisibility
  }

  closeLanguageSelector(){
    this.languageSelectorVisibility = false
  }

}
