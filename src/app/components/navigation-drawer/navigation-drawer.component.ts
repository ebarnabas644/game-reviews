import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';

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

  constructor(private drawerService: NavigationDrawerService, private desktopModeService: DesktopModeService, private themeService: ThemeService, private router: Router, private location: Location, private cookieService: CookieService) {
   }

  ngOnInit(): void {
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

}
