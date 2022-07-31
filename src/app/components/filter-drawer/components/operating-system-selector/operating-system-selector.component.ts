import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-operating-system-selector',
  templateUrl: './operating-system-selector.component.html',
  styleUrls: ['./operating-system-selector.component.scss']
})
export class OperatingSystemSelectorComponent implements OnInit, OnDestroy {

  osArray: boolean[] = []
  @Input() darkMode!: boolean

  osSelectedSub!: Subscription

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.osSelectedSub = this.filterService.getOsSelection().subscribe(selected => {
      this.osArray = []
      selected.forEach(item => this.osArray.push(item == 1 ? true : false))
    })
  }

  onOsChange(event: any){
    console.log(event.id)
    switch (event.id) {
      case "windows":
        this.osArray[0] = !this.osArray[0]
        break;
      case "linux":
        this.osArray[1] = !this.osArray[1]
        break;
      case "mac":
        this.osArray[2] = !this.osArray[2]
        break;
    }
    this.filterService.updateOsSelection(this.osArray)
  }

  ngOnDestroy(): void {
    
  }

}
