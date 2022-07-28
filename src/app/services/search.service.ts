import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private appName = new Subject<string>();

  public getAppName(): Observable<string>{
    return this.appName.asObservable()
  }

  public updateAppName(newAppName: string): void{
    this.appName.next(newAppName)
  }

  constructor() { }

  
}
