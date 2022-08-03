import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppOther } from 'src/app/model/AppOther';
import { FilterService } from 'src/app/services/filter.service';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-genre-selector',
  templateUrl: './genre-selector.component.html',
  styleUrls: ['./genre-selector.component.scss']
})
export class GenreSelectorComponent implements OnInit, OnDestroy {

  selectedGenres: AppOther[] = []
  genres!: AppOther[]
  genresLabel!: string

  genreDataSub!: Subscription
  selectedGenreSub!: Subscription

  constructor(private filterService: FilterService, private gameDataService: GameDataService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.stream(['filter.genres']).subscribe(translations => {
      this.genresLabel = translations['filter.genres']
    })
    this.genreDataSub = this.gameDataService.getGameGenres().subscribe(genres => {
      this.genres = genres
    })
    this.selectedGenreSub = this.filterService.getGenres().subscribe(selected => {
      this.selectedGenres = selected;
    })
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

  ngOnDestroy(): void {
    this.genreDataSub.unsubscribe()
    this.selectedGenreSub.unsubscribe()
  }
}
