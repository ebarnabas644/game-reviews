import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'game-reviews';
  desktopMode = true;
  desktopWidth = 900;

  onResize(event: any) {
    this.checkDesktopMode()
  }

  checkDesktopMode(): void{
    if(window.innerWidth > this.desktopWidth){
      this.desktopMode = true
    }
    else{
      this.desktopMode = false
    }
  }
}
