import { Component, NgZone, OnInit, ElementRef, AfterViewChecked, ChangeDetectorRef } from '@angular/core';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from '../../../../services/game-data.service'
import { ViewChild } from '@angular/core'
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { map, pairwise, filter, throttleTime, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AppBase } from 'src/app/model/AppBase';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  currentindex = 0
  gameListCache: AppDetail[] = []
  newData: AppDetail[] = []
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;
  @ViewChild('row') testHeight!: ElementRef
  rowHeight: number = 100
  cardPerRow: number = 1
  cardSize: number = 240
  counter: number = 0
  gridList: AppDetail[][] = [];
  currentSearchName: String = ""
  private timeout: number = 500
  private interval!: number
  private firstStartUp: boolean = true


  constructor(private gameDataService: GameDataService, private ngZone: NgZone, private cdr: ChangeDetectorRef, private searchService: SearchService) { }

  ngOnInit(): void {
  
    /*this.gameDataService
      .getGameDetailBatch(this.currentindex)
      .subscribe((games) => (this.gameList = games))*/
      this.fetchMore()

      this.searchService.getAppName().subscribe(name => {
        this.currentSearchName = name
        this.currentindex = 0
        this.scroller.scrollToIndex(0)
        this.fetchMore()
      })
     //this.gameList = this.gameDataService.getDummyAppDetailList()
     this.cardPerRow = Math.floor((window.innerWidth * 0.5) / this.cardSize)
      console.log(this.cardPerRow)
  }

  ngAfterViewInit(): void{
    this.setupScroller()
  }

  fetchMore(): void{
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
    this.currentindex += 50;
    this.gameDataService.getGameDetailBatch(this.currentindex, this.currentSearchName)
      .subscribe({
        next: (data) => this.splitDataIntoGrid(data),
        error: (err) => console.log(err),
        complete: () => {
          this.updateRowHeight()}})
  }

  resetSearch(){
    this.currentindex = 0
    this.currentSearchName = ""
    this.fetchMore()
  }

  reFetch(): void{
    var row: AppDetail[] = [];
    this.splitDataIntoGrid(this.gameListCache)
  }

  onResize(event: any) {
    var temp = this.cardPerRow
    this.cardPerRow = Math.max(Math.floor((window.innerWidth / 2) / this.cardSize), 1)
    console.log(this.cardPerRow)
    if(temp != this.cardPerRow){
      this.reFetch()
    }

    this.updateRowHeight()
  }

  splitDataIntoGrid(data: AppDetail[]): void{
    this.gameListCache = data
    var row: AppDetail[] = [];
    var temp: AppDetail[][] = []
    data.forEach(item => {
      row.push(this.removeInvalidCharacters(item))
      if(row.length == this.cardPerRow){
        temp.push(row)
        row = []
      }
    })
    temp.push(row)
    this.gridList = [...temp]
  }

  updateRowHeight(): void{
    if(this.testHeight != undefined){
      this.rowHeight = this.testHeight.nativeElement.offsetHeight
      this.cdr.detectChanges()
      console.log(this.rowHeight)
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
       this.fetchMore();
      });
    })
  }

  removeInvalidCharacters(data: AppDetail): AppDetail{
    let filteredName = data.name.replace(/\?/g,'')
    data.name = filteredName
    return data
  }

}
