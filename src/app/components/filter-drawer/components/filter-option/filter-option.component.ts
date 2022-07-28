import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppOther } from 'src/app/model/AppOther';

@Component({
  selector: 'app-filter-option',
  templateUrl: './filter-option.component.html',
  styleUrls: ['./filter-option.component.scss']
})
export class FilterOptionComponent implements OnInit {

  @Input() title!: string;
  @Input() items!: AppOther[];
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
    console.log("clicked")
  }

  onChange(event: any){
    this.onSelect.emit(event)
  }

}
