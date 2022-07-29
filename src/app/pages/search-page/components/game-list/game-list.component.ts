import { Component, NgZone, OnInit, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from '../../../../services/game-data.service'
import { ViewChild } from '@angular/core'
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AppBase } from 'src/app/model/AppBase';
import { SearchService } from 'src/app/services/search.service';
import { FilterService } from 'src/app/services/filter.service';
import { AppOther } from 'src/app/model/AppOther';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  gameListCache: AppDetail[] = []
  newData: AppDetail[] = []
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  @ViewChild('row') testHeight!: ElementRef
  rowHeight: number = 315
  cardPerRow: number = 1
  cardSize: number = 240
  counter: number = 0
  gridList: AppDetail[][] = [];
  currentSearchName: string = ""
  private timeout: number = 500
  private interval!: number
  private firstStartUp: boolean = true
  genresFilter: string = ""
  categoryFilter: string = ""


  constructor(private gameDataService: GameDataService, private ngZone: NgZone, private cdr: ChangeDetectorRef, private searchService: SearchService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.gameDataService.resetBatchIndex()
    this.fetchData()
    this.searchSubscription();
    this.genreFilterSubscription();
    this.categoryFilterSubscription();
    this.onResize();
    console.log(this.cardPerRow)
  }

  
  fetchData(): void{
    window.clearTimeout(this.timeout)

    if(this.firstStartUp){
      this.interval = 0
      this.firstStartUp = false
    }
    else{
      this.interval = 200
    }
    this.timeout = window.setTimeout(() => this.fetchSubscribe(), this.interval)

  }

  fetchSubscribe(): void{
    this.gameDataService.getGameDetailBatch({ name: this.currentSearchName, genres: this.genresFilter, categories: this.categoryFilter })
      .subscribe({
        next: (data) => this.fillCache(data),
        error: (err) => console.log(err),
        complete: () => {
          }})
  }

  fillCache(data: AppDetail[]): void{
    console.log(data)
    data.forEach(item => this.gameListCache.push(item))
    this.splitDataIntoGrid()
  }

  splitDataIntoGrid(): void{
    var row: AppDetail[] = []
    var temp: AppDetail[][] = []
    this.gameListCache.forEach(item => {
      row.push(this.removeInvalidCharacters(item))
      if(row.length == this.cardPerRow){
        temp.push(row)
        row = []
      }
    })
    temp.push(row)
    this.gridList = [...temp]
  }

  private searchSubscription(){
    this.searchService.getAppName().subscribe(name => {
      this.currentSearchName = name
      this.resetScroller()
      this.fetchData()
    })
  }

  private genreFilterSubscription() {
    this.filterService.getGenres().subscribe(genres => {
      this.genresFilter = this.convertArrayToString(genres)
      this.resetScroller();
      this.fetchData();
    });
  }

  private categoryFilterSubscription() {
    this.filterService.getCategories().subscribe(categories => {
      this.categoryFilter = this.convertArrayToString(categories)
      this.resetScroller();
      this.fetchData();
    });
  }

  private windowsFilterSubscription(){

  }

  private macFilterSubscription(){
    
  }

  private linuxFilterSubscription(){
    
  }

  private comingsoonFilterSubscription(){
    
  }

  private convertArrayToString(array: AppOther[]): string{
    var converted: string = ""
    array.forEach(item => converted += item.value + ",");
      converted = converted.substring(0, converted.length - 1);
    return converted
  }

  ngAfterViewInit(): void{
    this.setupScroller()
    this.updateRowHeight()
  }


  resetSearch(){
    this.resetScroller()
    this.currentSearchName = ""
    this.fetchData()
  }

  resetScroller(){
    this.scroller.scrollToIndex(0);
    this.gameDataService.resetBatchIndex()
    this.gameListCache = []
  }

  onResize() {
    var temp = this.cardPerRow
    this.cardPerRow = Math.max(Math.floor((window.innerWidth / 2) / this.cardSize), 1)
    console.log(this.cardPerRow)
    if(temp != this.cardPerRow){
      this.splitDataIntoGrid()
    }

    this.updateRowHeight()
  }

  updateRowHeight(): void{
    if(this.testHeight != undefined){
      this.rowHeight = this.testHeight.nativeElement.offsetHeight
      this.cdr.detectChanges()
      console.log(this.rowHeight)
    }
    else{
      console.log("No row height avaiable")
    }
  }

  setupScroller(): void{
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(500)
    ).subscribe(() => {
      this.ngZone.run(() => {
       this.fetchData();
      });
    })
  }

  removeInvalidCharacters(data: AppDetail): AppDetail{
    let filteredName = data.name.replace(/\?/g,'')
    data.name = filteredName
    return data
  }

}
