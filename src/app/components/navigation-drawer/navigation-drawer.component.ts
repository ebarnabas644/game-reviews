import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav;
  desktopWidth = 900;
  desktopMode = true

  constructor(private drawerService: NavigationDrawerService, private desktopModeService: DesktopModeService) {
   }

  ngOnInit(): void {
    this.drawerService.setSidenav(this.sidenav)
    this.desktopModeService
    .getDesktopModeStatus()
    .subscribe(mode => {
      this.desktopMode = mode
      console.log("Desktop mode: "+mode)
    })
  }

}
