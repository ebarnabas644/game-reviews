import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from 'src/app/services/game-data.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { WishlistService } from 'src/app/services/wishlist.service';

@UntilDestroy()
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailPageComponent implements OnInit, OnDestroy {

  id!: number
  private sub: any
  game!: AppDetail
  images!: string[]
  selectedImage!: string
  offset: number = 0
  private outer!: ElementRef
  @ViewChild('outer') set outerElement(element: ElementRef){
    this.outer = element
  }
  private bigScreenshot!: QueryList<ElementRef>
  @ViewChildren('bigscreenshot') set bigScreenshotElements(elements: QueryList<ElementRef>){
    this.bigScreenshot = elements
  }
  currentLanguage!: string
  isLoading: boolean = true

  constructor(private route: ActivatedRoute, private gameDataService: GameDataService, private toolbarService: ToolbarService, private translate: TranslateService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.currentLanguage = this.translate.currentLang
    this.routeParamSubscribe()
    this.onLanguageChangeSubscribe()
  }

  routeParamSubscribe(){
    this.sub = this.route.params.pipe(untilDestroyed(this)).subscribe(params => {
      this.id = +params['id']

      this.loadGameDetailSubscribe(this.id)
    })
  }

  onLanguageChangeSubscribe(){
    this.translate.onLangChange.pipe(untilDestroyed(this)).subscribe((event: LangChangeEvent) =>{
      this.currentLanguage = event.lang
      this.loadGameDetailSubscribe(this.id)
    })
  }

  loadGameDetailSubscribe(id: number): void{
    this.gameDataService.getGameDetail(id,this.currentLanguage).pipe(untilDestroyed(this)).subscribe({
      next: (game) => {
        this.isLoading = true
        this.game = this.removeInvalidCharacters(game)
        this.images = this.game.screenshots_full.split(',')
        this.selectedImage = this.images[0]
        this.updateTitle()
        this.isLoading = false
      },
      complete: () => {
        this.updateFavouriteCache()
      }
    })
  }

  updateFavouriteCache(){
    this.wishlistService.getFavouriteState(this.game.steam_appid).pipe(untilDestroyed(this)).subscribe(state => {
      this.wishlistService.toggleFavouriteCache(state.found)
    })
  }

  removeInvalidCharacters(data: AppDetail): AppDetail{
    data.name = data.name.replace(/\?+/g,'')
    data.detailed_description = data.detailed_description.replace(/\?{2,}/g,'')
    return data
  }

  setSelected(selected: string){
    this.selectedImage = selected
    let index = this.images.indexOf(this.selectedImage)
    this.offset = 0
    let imageElementArray = this.bigScreenshot.toArray()
    for (let i = 0; i < index; i++) {
       this.offset += imageElementArray[i].nativeElement.clientWidth
    }
    
    
  }

  onResize(event: any){

  }

  updateTitle(): void{
    this.toolbarService.updateTitle(this.game.name)
  }

  ngOnDestroy(): void {
  }

}
