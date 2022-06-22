import { Component, OnInit, Input } from '@angular/core';
import { AppDetail } from 'src/app/model/AppDetail';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss']
})
export class GameListItemComponent implements OnInit {
  @Input() game!: AppDetail;
  

  constructor() { }

  ngOnInit(): void {
  }

}
