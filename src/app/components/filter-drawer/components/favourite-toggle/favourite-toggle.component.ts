import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FilterService } from 'src/app/services/filter.service';

@UntilDestroy()
@Component({
  selector: 'app-favourite-toggle',
  templateUrl: './favourite-toggle.component.html',
  styleUrls: ['./favourite-toggle.component.scss']
})
export class FavouriteToggleComponent implements OnInit {

  toggleState: boolean = false

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.getFavourite().pipe(untilDestroyed(this)).subscribe(value => {
      this.toggleState = value
    })
  }

  onToggle(){
    this.toggleState = !this.toggleState
    this.filterService.setFavourite(this.toggleState)
  }

}
