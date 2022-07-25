import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  desktopMode!: boolean
  title!: String

  constructor(private navigationDrawerService: NavigationDrawerService, private filterDrawerService: FilterDrawerService, private router: Router, private desktopModeService: DesktopModeService, private toolbarService: ToolbarService) { }

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
      this.toolbarService.getTitle().subscribe(title => this.title = title)
  }

  isHomeView() {
    return this.router.url.match('^/$');
  }

  isSearchView() {
    return this.router.url.match('^/search$');
  }

  isGameView(){
    return this.router.url.match('^/search/.*$');
  }

}
