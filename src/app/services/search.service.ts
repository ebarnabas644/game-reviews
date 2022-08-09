import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private appName = new BehaviorSubject<string>("");
  private isLoading = new BehaviorSubject<boolean>(false);

  public getAppName(): Observable<string>{
    return this.appName.asObservable()
  }

  public updateAppName(newAppName: string): void{
    this.appName.next(newAppName)
  }

  public getIsLoading(){
    return this.isLoading.asObservable()
  }

  public updateIsLoading(newIsLoading: boolean){
    this.isLoading.next(newIsLoading)
  }

  constructor() { }

  
}
