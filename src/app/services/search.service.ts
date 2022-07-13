import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private appName = new Subject<String>();

  public getAppName(): Observable<String>{
    return this.appName.asObservable()
  }

  public updateAppName(newAppName: String): void{
    this.appName.next(newAppName)
  }

  constructor() { }

  
}
