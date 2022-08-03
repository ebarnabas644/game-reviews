import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from 'src/app/services/game-data.service';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss']
})
export class DetailPageComponent implements OnInit {

  id!: number
  private sub: any
  game!: AppDetail
  images!: string[]
  selectedImage!: string
  offset: number = 0
  @ViewChild('outer') outer!: ElementRef
  @ViewChildren('bigscreenshot') bigScreenshot!: QueryList<ElementRef>

  constructor(private route: ActivatedRoute, private gameDataService: GameDataService, private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']

      this.loadGameDetail(this.id)
    })
  }

  loadGameDetail(id: number): void{
    this.gameDataService.getGameDetail(id).subscribe(game => {
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

}
