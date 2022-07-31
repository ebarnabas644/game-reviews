import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-game-display',
  templateUrl: './game-display.component.html',
  styleUrls: ['./game-display.component.scss']
})
export class GameDisplayComponent implements OnInit {
  featuredGames!: AppDetail[]
  selectedGame!: AppDetail
  selectedIndex!: number
  displayedGames: AppDetail[] = []
  offsetIndex: number = 2;
  numberOfDisplayed: number = 5;
  nextImageHoverTimer!: any
  nextSelectedGameTimer!: any
  styleClasses: string[] = ["farLeft", "left", "middle", "right", "farRight"]
  clickEvents = [this.previousGame.bind(this), this.previousGame.bind(this), this.openSelected.bind(this), this.nextGame.bind(this), this.nextGame.bind(this)]
  @ViewChildren('image') images!:QueryList<ElementRef>;
  selectedImages: string[] = []

  constructor(private gameDataService: GameDataService, private router: Router) { }

  ngOnInit(): void {
    this.gameDataService.getFeaturedGames().subscribe(featuredGames => {
      this.featuredGames = featuredGames
      this.selectedIndex = 0
      this.selectedGame = this.featuredGames[this.selectedIndex]
      console.log(this.featuredGames)
      for(let i = 0; i < this.numberOfDisplayed; i++){
        this.displayedGames.push(featuredGames[i])
      }
      this.selectedGame = this.displayedGames[2]
      this.selectedImages = this.selectedGame.screenshots_thumbnail.split(",")
    })
    this.nextSelectedGameTimer = setInterval(() => {
      this.nextGame()
    }, 3000)
  }

  nextGame(): void{
    this.images.get(2)!.nativeElement.src = this.selectedGame.header_image
    this.offsetIndex = this.wrap(this.offsetIndex + 1)
    this.displayedGames.push(this.featuredGames[this.wrap(this.offsetIndex + 2)])
    this.displayedGames.shift()
    this.selectedGame = this.displayedGames[2]
    this.selectedImages = this.selectedGame.screenshots_thumbnail.split(",")
  }

  previousGame(): void{
    this.images.get(2)!.nativeElement.src = this.selectedGame.header_image
    this.offsetIndex = this.wrap(this.offsetIndex - 1)
    this.displayedGames.unshift(this.featuredGames[this.wrap(this.offsetIndex - 2)])
    this.displayedGames.pop()
    this.selectedGame = this.displayedGames[2]
    this.selectedImages = this.selectedGame.screenshots_thumbnail.split(",")
  }

  nextImage(game: AppDetail){
    if(game != this.selectedGame){
      return
    }
    let index = 0;
    this.images.get(2)!.nativeElement.src = this.selectedImages[index++ % this.selectedImages.length]
    this.nextImageHoverTimer = setInterval(() => {
      this.images.get(2)!.nativeElement.src = this.selectedImages[index++ % this.selectedImages.length]
    }, 1000)

  }

  stopNextImage(game: AppDetail){
    if(game != this.selectedGame){
      return
    }
    clearInterval(this.nextImageHoverTimer)
    this.images.get(2)!.nativeElement.src = this.selectedGame.header_image
  }

  hoverDisplay(){
    clearInterval(this.nextSelectedGameTimer)
  }

  leaveDisplay(){
    this.nextSelectedGameTimer = setInterval(() => {
      this.nextGame()
    }, 3000)
  }

  wrap(index: number): number{
    return this.mod(index, this.featuredGames.length);
  }

  mod(n: number, m: number) {
    return ((n % m) + m) % m;
  }

  openSelected(){
    this.router.navigateByUrl(`/search/${this.selectedGame.steam_appid}`)
  }

}
