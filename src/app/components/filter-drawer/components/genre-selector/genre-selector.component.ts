import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppOther } from 'src/app/model/AppOther';
import { FilterService } from 'src/app/services/filter.service';
import { GameDataService } from 'src/app/services/game-data.service';

@UntilDestroy()
@Component({
  selector: 'app-genre-selector',
  templateUrl: './genre-selector.component.html',
  styleUrls: ['./genre-selector.component.scss']
})
export class GenreSelectorComponent implements OnInit, OnDestroy {

  selectedGenres: AppOther[] = []
  genres!: AppOther[]
  genresLabel!: string
  currentLanguage!: string

  constructor(private filterService: FilterService, private gameDataService: GameDataService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang
    this.onLanguageChangeSubscribe()
    this.getGenreSubscribe()
    this.selectedGenreSubscribe()
    this.labeTranslateSubscribe()
  }

  onLanguageChangeSubscribe(){
    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe((event: LangChangeEvent) =>{
      this.currentLanguage = event.lang
      this.getGenreSubscribe()
    })
  }

  getGenreSubscribe(){
    this.gameDataService.getGameGenres(this.currentLanguage).pipe(untilDestroyed(this)).subscribe(genres => {
      this.genres = genres
    })
  }

  selectedGenreSubscribe(){
    this.filterService.getGenres().pipe(untilDestroyed(this)).subscribe(selected => {
      this.selectedGenres = selected;
    })
  }

  labeTranslateSubscribe(){
    this.translate.stream(['filter.genres']).pipe(untilDestroyed(this)).subscribe(translations => {
      this.genresLabel = translations['filter.genres']
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
  }
}
