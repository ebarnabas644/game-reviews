import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AppOther } from 'src/app/model/AppOther';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';
import { FilterService } from 'src/app/services/filter.service';
import { GameDataService } from 'src/app/services/game-data.service';
import { ThemeService } from 'src/app/services/theme.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav;
  desktopMode = true;
  desktopStatusSubscription!: Subscription
  filterSubscription!: Subscription
  darkMode!: boolean
  genresLabel!: string

  constructor(private drawerService: FilterDrawerService, private desktopModeService: DesktopModeService, private filterService: FilterService, private gameDataService: GameDataService, private themeService: ThemeService, private translate: TranslateService) {
   }

  ngOnInit(): void {
    this.desktopStatusSubscription = this.desktopModeService
      .getDesktopModeStatus()
      .subscribe(mode => {
        this.desktopMode = mode
      })
      this.themeService.getDarkMode().subscribe(mode =>{
        this.darkMode = mode
      })
  }

  ngAfterViewInit(): void{
    this.drawerService.setSidenav(this.sidenav)
  }

  ngOnDestroy(): void{
    this.desktopStatusSubscription.unsubscribe()
  }

}
