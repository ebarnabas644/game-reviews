import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { AppOther } from '../model/AppOther';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private supportedLanguages = new Subject<string>();
  private genres = new Subject<AppOther[]>();
  private categories = new Subject<AppOther[]>();
  private windows = new Subject<number>();
  private mac = new Subject<number>();
  private linux = new Subject<number>();
  private min_metacritic_score = new Subject<number>();
  private coming_soon = new Subject<number>();

  public getSupportedLanguages(): Observable<string>{
    return this.supportedLanguages.asObservable()
  }

  public updateSupportedLanguages(newAppName: string): void{
    this.supportedLanguages.next(newAppName)
  }

  public getGenres(): Observable<AppOther[]>{
    return this.genres.asObservable()
  }

  public updateGenres(newGenres: AppOther[]): void{
    this.genres.next(newGenres)
  }

  public getCategories(): Observable<AppOther[]>{
    return this.categories.asObservable()
  }

  public updateCategories(newCategories: AppOther[]){
    this.categories.next(newCategories)
  }

  public getWindows(): Observable<number>{
    return this.windows.asObservable()
  }

  public updateWindows(newWindows: number){
    this.windows.next(newWindows)
  }

  public getMac(): Observable<number>{
    return this.mac.asObservable()
  }

  public updateMac(newMac: number){
    this.mac.next(newMac)
  }

  public getLinux(): Observable<number>{
    return this.linux.asObservable()
  }

  public updateLinux(newLinux: number){
    this.linux.next(newLinux)
  }

  public getMinMetacriticScore(): Observable<number>{
    return this.min_metacritic_score.asObservable()
  }

  public updateMinMetacriticScore(newMetacriticScore: number){
    this.min_metacritic_score.next(newMetacriticScore)
  }

  public getComingSoon(): Observable<number>{
    return this.coming_soon.asObservable()
  }

  public updateComingSoon(newComingSoon: number){
    this.coming_soon.next(newComingSoon)
  }

  constructor() { }
}
