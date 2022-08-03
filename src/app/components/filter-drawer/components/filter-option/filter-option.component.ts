import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { AppOther } from 'src/app/model/AppOther';

@Component({
  selector: 'app-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterOptionComponent implements OnInit {

  @Input() title!: string;
  @Input() items!: AppOther[];
  @Input() checkedItems!: AppOther[];
  @Output() onSelect = new EventEmitter();
  isVisible = false
  height = 0

  constructor() { }

  ngOnInit(): void {
  }

  togglePanel(){
    this.isVisible = !this.isVisible
    if(this.isVisible){
      this.height = 400
    }
    else{
      this.height = 0
    }
  }

  onChange(event: any){
    this.onSelect.emit(event)
  }

  alreadySelectedCheck(item: AppOther): boolean{
    for (let i = 0; i < this.checkedItems.length; i++) {
      if(this.checkedItems[i].value == item.value){
        return true
      }
    }
    return false
  }

  trackByFn(index: number, item: AppOther) {
    return item.value;
}

}
