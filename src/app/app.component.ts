import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DesktopModeService } from './services/desktop-mode.service';
import { ThemeService } from './services/theme.service';
import { NgcCookieConsentService } from 'ngx-cookieconsent';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'game-reviews';
  desktopWidth = 900;
  darkMode = false

  constructor(private desktopModeService: DesktopModeService, private themeService: ThemeService, private translate: TranslateService){
  }

  ngOnInit(): void{
    this.translate.addLangs(['en', 'de']);
    this.translate.setDefaultLang('en');
    this.translate.use('en');
    this.themeService.getDarkMode().subscribe(darkMode => this.darkMode = darkMode)
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
}
