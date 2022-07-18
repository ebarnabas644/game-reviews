import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  desktopMode = true

  constructor(private navigationDrawerService: NavigationDrawerService, private filterDrawerService: FilterDrawerService, private router: Router, private desktopModeService: DesktopModeService) { }

  toggleNavigationDrawer(): void{
    this.navigationDrawerService.toggle()
  }

  toggleFilterDrawer(): void{
    this.filterDrawerService.toggle()
  }

  ngOnInit(): void {
    this.desktopModeService
      .getDesktopModeStatus()
      .subscribe(mode => this.desktopMode = mode)
  }

  isHomeView() {
    // return true if the current page is home
    return this.router.url.match('^/$');
  }

  isSearchView() {
    // return true if the current page is login
    return this.router.url.match('^/search$');
  }

}
