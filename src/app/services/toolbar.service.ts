import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  private title = new Subject<String>()

  public getTitle(): Observable<String>{
    return this.title.asObservable()
  }

  public updateTitle(newTitle: String): void{
    this.title.next(newTitle)
  }

  constructor() { }
}
