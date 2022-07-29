import { Component, OnInit } from '@angular/core';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from 'src/app/services/game-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
