import {
  Component,
  OnInit,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  AfterViewChecked,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AppDetail } from 'src/app/model/AppDetail';
import { GameDataService } from 'src/app/services/game-data.service';

@UntilDestroy()
@Component({
  selector: 'app-game-list-item',
  templateUrl: './game-list-item.component.html',
  styleUrls: ['./game-list-item.component.scss'],
})
export class GameListItemComponent implements OnInit, OnDestroy {
  @Input() games!: AppDetail[];
  screenHeight!: number;

  constructor(
    private router: Router,
    private gameDataService: GameDataService
  ) {}

  ngOnInit(): void {
    this.screenHeight = 10;
  }

  onGameClick(appid: number) {
    this.gameDataService
      .addGameToUpdateSchedule(appid)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.navigateToGame(appid));
  }

  navigateToGame(appid: number) {
    this.router.navigateByUrl(`/search/${appid}`);
  }

  ngOnDestroy(): void {}
}
