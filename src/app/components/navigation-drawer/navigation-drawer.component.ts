import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationDrawerService } from 'src/app/services/navigation-drawer.service';

@Component({
  selector: 'app-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.scss']
})
export class DrawerComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav;

  constructor(private drawerService: NavigationDrawerService) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.drawerService.setSidenav(this.sidenav)
  }

}
