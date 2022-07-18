import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from 'src/app/services/game-data.service';

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

  constructor(private route: ActivatedRoute, private gameDataService: GameDataService) { }

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
      console.log(this.images)
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
    for (let i = 0; i < index; i++) {
       this.offset += document.querySelector(`.big-screenshot[src='${this.images[i]}']`)!.clientWidth
    }
    
    
  }

  onResize(event: any){

  }

}
