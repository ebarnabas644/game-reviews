import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.scss']
})
export class FilterDrawerComponent implements OnInit {

  @ViewChild('drawer') public sidenav!: MatSidenav;

  constructor(private drawerService: FilterDrawerService) {
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.drawerService.setSidenav(this.sidenav)
  }

}
