import { Component, NgZone, OnInit, ElementRef, AfterViewChecked, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from '../../../../services/game-data.service'
import { ViewChild } from '@angular/core'
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime, debounceTime, distinctUntilChanged, takeUntil, Subscription } from 'rxjs';
import { AppBase } from 'src/app/model/AppBase';
import { SearchService } from 'src/app/services/search.service';
import { FilterService } from 'src/app/services/filter.service';
import { AppOther } from 'src/app/model/AppOther';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { TitleStrategy } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameListComponent implements OnInit, OnDestroy {
  gameListCache: AppDetail[] = []
  newData: AppDetail[] = []
  private scrollerElement!: CdkVirtualScrollViewport
  @ViewChild('scroller') set scroller(scroller: CdkVirtualScrollViewport){
      this.scrollerElement = scroller
  };
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
  osSelection: number[] = [-1,-1,-1]
  currentLanguage!: string
  isLoading = false
  lastBatch = false

  constructor(private gameDataService: GameDataService, private ngZone: NgZone, private searchService: SearchService, private filterService: FilterService, private ref: ChangeDetectorRef, private translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang
    
    //this.gameDataService.resetBatchIndex()
    this.onLanguageChangeSubscribe()
    this.searchSubscription()
    this.genreFilterSubscription()
    this.categoryFilterSubscription()
    this.osSelectionSubscription()
    this.LoadingSubscription()
    
    //this.gameDataService.resetSearch()
    this.fetchSubscribe()
    this.onResize()

    //this.setSearchParameters()
  }

  
  searchWithDelay(): void{
    window.clearTimeout(this.timeout)
    if(this.firstStartUp){
      this.interval = 0
      this.firstStartUp = false
    }
    else{
      this.interval = 500
    }
    this.timeout = window.setTimeout(() => this.setSearchParameters(), this.interval)
  }

  onLanguageChangeSubscribe(){
    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe((event: LangChangeEvent) =>{
      this.currentLanguage = event.lang
    })
  }

  fetchSubscribe(): void{
    this.gameDataService.gameData$.pipe(untilDestroyed(this)).subscribe(
      data => {
          this.searchService.updateIsLoading(true)
          this.ref.markForCheck()
          if(data.length != 0){
            this.gameListCache = data
            console.log(this.gameListCache)
            this.splitDataIntoGrid()
            this.isLoading = false
          }
          else{
            this.lastBatch = true
            console.log("last reached")
          }
          this.searchService.updateIsLoading(false)
          this.ref.markForCheck()
      }
    )
  }

  setSearchParameters(){
    this.resetGrid()
    this.searchService.updateIsLoading(true)
    this.ref.markForCheck()
    this.gameDataService.modifyQueryParameters({ name: this.currentSearchName, genres: this.genresFilter, categories: this.categoryFilter, osSelection: this.osSelection, language: this.currentLanguage })
  }

  fillCache(data: AppDetail[]): void{
    this.gameListCache = data
    console.log(data)
    this.splitDataIntoGrid()
  }

  splitDataIntoGrid(): void{
    let row: AppDetail[] = []
    if(this.gridList.length > 0){
      if(this.gridList[this.gridList.length - 1].length < this.cardPerRow){
        row = this.gridList.pop()!
      }
    }
    var temp: AppDetail[][] = []
    this.gameListCache.forEach(item => {
      row.push(this.removeInvalidCharacters(item))
      if(row.length == this.cardPerRow){
        temp.push(row)
        row = []
      }
    })
    if(row.length != 0){
      temp.push(row)
    }
    this.gridList = [...this.gridList, ...temp]
  }

  private searchSubscription(){
    this.searchService.getAppName().pipe(untilDestroyed(this)).subscribe(name => {
      this.currentSearchName = name
      this.resetScroller()
      this.searchWithDelay()
    })
  }

  private genreFilterSubscription() {
    this.filterService.getGenres().pipe(untilDestroyed(this)).subscribe(genres => {
      this.genresFilter = this.convertArrayToString(genres)
      this.resetScroller();
      this.searchWithDelay()
    });
  }

  private categoryFilterSubscription() {
    this.filterService.getCategories().pipe(untilDestroyed(this)).subscribe(categories => {
      this.categoryFilter = this.convertArrayToString(categories)
      this.resetScroller();
      this.searchWithDelay()
    });
  }

  private osSelectionSubscription(){
    this.filterService.getOsSelection().pipe(untilDestroyed(this)).subscribe(selection =>{
      this.osSelection = selection
      this.resetScroller();
      this.searchWithDelay()
    })
  }

  private LoadingSubscription(){
    this.searchService.getIsLoading().pipe(untilDestroyed(this)).subscribe(value => {
      this.isLoading = value
    })
  }

  private convertArrayToString(array: AppOther[]): string{
    var converted: string = ""
    array.forEach(item => converted += item.value + ",");
      converted = converted.substring(0, converted.length - 1);
    return converted
  }

  ngAfterViewInit(): void{
    this.setupScroller()
  }

  resetGrid(){
    this.resetScroller()
    this.lastBatch = false
    this.gridList = []
    this.gameListCache = []
    this.gameDataService.resetSearch()
  }

  resetSearch(){
    this.resetScroller()
    this.currentSearchName = ""
    this.lastBatch = false
    this.gridList = []
    this.gameListCache = []
    this.gameDataService.resetSearch()
    //this.gameDataService.getNextBatch()
  }

  resetScroller(){
    if(this.scrollerElement != undefined){
      this.scrollerElement.scrollToIndex(0);
    }
  }

  onResize() {
    var temp = this.cardPerRow
    this.cardPerRow = Math.max(Math.floor((window.innerWidth / 2) / this.cardSize), 1)
    console.log(this.cardPerRow)
    if(temp != this.cardPerRow){
      this.splitDataIntoGrid()
    }
  }

  setupScroller(): void{
    this.scrollerElement.elementScrolled().pipe(
      map(() => this.scrollerElement.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(500)
    ).pipe(untilDestroyed(this)).subscribe(() => {
      this.ngZone.run(() => {
        if(!this.lastBatch){
          this.gameDataService.getNextBatch()
          console.log("scroll")
        }
      });
    })
  }

  removeInvalidCharacters(data: AppDetail): AppDetail{
    let filteredName = data.name.replace(/\?/g,'')
    data.name = filteredName
    return data
  }

  ngOnDestroy(): void { }

  trackByFn(index: number, item: AppDetail[]) {
    return item
  }
}
