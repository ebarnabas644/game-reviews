import { Component, OnInit } from '@angular/core';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from '../../../../services/game-data.service'

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss']
})
export class GameListComponent implements OnInit {
  breakpoint: number = 6
  gameList: AppDetail[] = []

  constructor(private gameDataService: GameDataService) { }

  ngOnInit(): void {
    /*
    this.gameDataService
      .getGameBaseData()
      .subscribe((games) => (this.gameList = games))
      */
     this.gameList = this.gameDataService.getDummyAppDetailList()
      this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 6;
  }

}
