import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Subscription } from 'rxjs';
import { AppOther } from 'src/app/model/AppOther';
import { DesktopModeService } from 'src/app/services/desktop-mode.service';
import { FilterDrawerService } from 'src/app/services/filter-drawer.service';
import { FilterService } from 'src/app/services/filter.service';
import { GameDataService } from 'src/app/services/game-data.service';

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
  genres!: AppOther[]
  selectedGenres: AppOther[] = []
  categories!: AppOther[]
  selectedCategories: AppOther[] = []

  constructor(private drawerService: FilterDrawerService, private desktopModeService: DesktopModeService, private filterService: FilterService, private gameDataService: GameDataService) {
   }

  ngOnInit(): void {
    this.desktopStatusSubscription = this.desktopModeService
      .getDesktopModeStatus()
      .subscribe(mode => {
        this.desktopMode = mode
      })
      this.gameDataService
      .getGameGenres()
      .subscribe(genres => {
        this.genres = genres
      })
      this.gameDataService
      .getGameCategories()
      .subscribe(categories => {
        this.categories = categories
      })
  }

  ngAfterViewInit(): void{
    this.drawerService.setSidenav(this.sidenav)
  }

  ngOnDestroy(): void{
    this.desktopStatusSubscription.unsubscribe()
  }

  onGenreChange(event: any): void{
    if(event.checked){
      var objectToAdd: AppOther = { value: event.value }
      this.selectedGenres.push(objectToAdd)
    }
    else{
      var objectToAdd: AppOther = { value: event.value }
      for(var i = 0; i < this.selectedGenres.length; i++){
        if(this.selectedGenres[i].value == objectToAdd.value){
          this.selectedGenres.splice(i,1)
          break
        }
      }
    }
    this.filterService.updateGenres(this.selectedGenres)
  }

  onCategoryChange(event: any): void{
    if(event.checked){
      var objectToAdd: AppOther = { value: event.value }
      this.selectedCategories.push(objectToAdd)
    }
    else{
      var objectToAdd: AppOther = { value: event.value }
      for(var i = 0; i < this.selectedCategories.length; i++){
        if(this.selectedCategories[i].value == objectToAdd.value){
          this.selectedCategories.splice(i,1)
          break
        }
      }
    }
    this.filterService.updateCategories(this.selectedCategories)
  }

}
