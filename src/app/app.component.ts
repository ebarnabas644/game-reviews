import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DesktopModeService } from './services/desktop-mode.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'game-reviews';
  desktopWidth = 900;

  constructor(private desktopModeService: DesktopModeService){
  }

  ngOnInit(): void{
    this.checkDesktopMode()
  }

  onResize(event: any) {
    this.checkDesktopMode()
  }

  checkDesktopMode(): void{
    if(window.innerWidth > this.desktopWidth){
      this.desktopModeService.setDesktopModeStatus(true)
    }
    else{
      this.desktopModeService.setDesktopModeStatus(false)
    }
  }
}
