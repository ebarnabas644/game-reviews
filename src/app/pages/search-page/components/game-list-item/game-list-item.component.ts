import { Component, OnInit, Input, ElementRef, ViewChild, AfterViewInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { AppDetail } from 'src/app/model/AppDetail';

@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss']
})
export class GameListItemComponent implements OnInit {
  @Input() games!: AppDetail[];
  screenHeight!: number

  constructor() { }

  ngOnInit(): void {
    this.screenHeight = 10
  }



}
