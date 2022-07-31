import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private appName = new BehaviorSubject<string>("");

  public getAppName(): Observable<string>{
    return this.appName.asObservable()
  }

  public updateAppName(newAppName: string): void{
    this.appName.next(newAppName)
  }

  constructor() { }

  
}
