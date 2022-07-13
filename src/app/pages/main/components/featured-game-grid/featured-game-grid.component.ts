import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-featured-game-grid',
  templateUrl: './featured-game-grid.component.html',
  styleUrls: ['./featured-game-grid.component.scss']
})
export class FeaturedGameGridComponent implements OnInit {
  
  breakpoint: number = 5
  constructor() { }

  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 400) ? 1 : 6;
  }

  onResize(event: any) {
    this.breakpoint = (event.target.innerWidth <= 400) ? 1 : 5;
    console.log("Resized")
  }

}
