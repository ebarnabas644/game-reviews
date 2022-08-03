import { Component, ElementRef, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from 'src/app/services/game-data.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@UntilDestroy()
@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit, OnDestroy {

  id!: number
  private sub: any
  game!: AppDetail
  images!: string[]
  selectedImage!: string
  offset: number = 0
  @ViewChild('outer') outer!: ElementRef
  @ViewChildren('bigscreenshot') bigScreenshot!: QueryList<ElementRef>
  currentLanguage!: string

  constructor(private route: ActivatedRoute, private gameDataService: GameDataService, private toolbarService: ToolbarService, private translate: TranslateService) { }

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
    this.gameDataService.getGameDetail(id,this.currentLanguage).pipe(untilDestroyed(this)).subscribe(game => {
      this.game = this.removeInvalidCharacters(game)
      this.images = this.game.screenshots_full.split(',')
      this.selectedImage = this.images[0]
      this.updateTitle()
    }
      )
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
