import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  searchValue = ""

  searchSub!: Subscription

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
    this.searchSub = this.searchService.getAppName().subscribe(value =>{
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
    this.searchSub.unsubscribe()
  }

}
