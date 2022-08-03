import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppOther } from 'src/app/model/AppOther';
import { FilterService } from 'src/app/services/filter.service';
import { GameDataService } from 'src/app/services/game-data.service';

@UntilDestroy()
@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent implements OnInit, OnDestroy {

  categories!: AppOther[]
  selectedCategories: AppOther[] = []
  categoriesLabel!: string
  currentLanguage!: string

  constructor(private filterService: FilterService, private gameDataService: GameDataService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang
    this.onLanguageChangeSubscribe()
    this.getCategorySubscribe()
    this.selectedCategorySubscribe()
    this.labelTranslateSubscribe()
  }

  onLanguageChangeSubscribe(){
    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe((event: LangChangeEvent) =>{
      this.currentLanguage = event.lang
      this.getCategorySubscribe()
    })
  }

  getCategorySubscribe(){
    this.gameDataService.getGameCategories(this.currentLanguage).pipe(untilDestroyed(this)).subscribe(categories => {
      this.categories = categories
    })
  }

  selectedCategorySubscribe(){
    this.filterService.getCategories().pipe(untilDestroyed(this)).subscribe(selected => {
      this.selectedCategories = selected
    })
  }

  labelTranslateSubscribe(){
    this.translate.stream(['filter.categories']).pipe(untilDestroyed(this))
    .subscribe(translations => {
      this.categoriesLabel = translations['filter.categories'];
    });
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

  ngOnDestroy(): void {
  }

}
