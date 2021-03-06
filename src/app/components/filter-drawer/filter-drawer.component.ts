import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav;
  desktopMode = true;

  constructor(private drawerService: FilterDrawerService, private desktopModeService: DesktopModeService) {
   }

  ngOnInit(): void {
    this.desktopModeService
      .getDesktopModeStatus()
      .subscribe(mode => this.desktopMode = mode)
  }

  ngAfterViewInit(): void{
    this.drawerService.setSidenav(this.sidenav)
  }

}
