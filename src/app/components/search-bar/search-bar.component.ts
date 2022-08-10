import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@UntilDestroy()
@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  searchValue = ""

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchService.getAppName().pipe(untilDestroyed(this)).subscribe(value =>{
      this.searchValue = value
    })
  }

  onSearch(event: any): void{
    this.searchValue = event.target.value
    this.searchService.updateAppName(this.searchValue)
  }

  onClear(): void{
    this.searchService.updateAppName("")
    this.searchValue = ""
  }

  ngOnDestroy(): void {
  }

}
