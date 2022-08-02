import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { AppOther } from 'src/app/model/AppOther';
import { FilterService } from 'src/app/services/filter.service';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-category-selector',
  templateUrl: './category-selector.component.html',
  styleUrls: ['./category-selector.component.scss']
})
export class CategorySelectorComponent implements OnInit, OnDestroy {

  categories!: AppOther[]
  selectedCategories: AppOther[] = []
  categoriesLabel!: string

  categoryDataSub!: Subscription
  selectedCategorySub!: Subscription

  constructor(private filterService: FilterService, private gameDataService: GameDataService, private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.stream(['filter.categories'])
    .subscribe(translations => {
      this.categoriesLabel = translations['filter.categories'];
    });
    this.categoryDataSub = this.gameDataService.getGameCategories().subscribe(categories => {
      this.categories = categories
    })
    this.selectedCategorySub = this.filterService.getCategories().subscribe(selected => {
      this.selectedCategories = selected
    })
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
    this.categoryDataSub.unsubscribe()
    this.selectedCategorySub.unsubscribe()
  }

}
