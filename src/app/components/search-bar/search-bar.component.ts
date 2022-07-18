import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  searchValue = ""

  constructor(private searchService: SearchService) { }

  ngOnInit(): void {
  }

  onSearch(event: any): void{
    this.searchValue = event.target.value
    this.searchService.updateAppName(this.searchValue)
  }

  onClear(): void{
    this.searchService.updateAppName("")
    this.searchValue = ""
  }

}
