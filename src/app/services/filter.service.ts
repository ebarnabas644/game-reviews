import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { AppOther } from '../model/AppOther';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  private supportedLanguages = new BehaviorSubject<string>('');
  private genres = new BehaviorSubject<AppOther[]>([]);
  private categories = new BehaviorSubject<AppOther[]>([]);
  private min_metacritic_score = new BehaviorSubject<number>(0);
  private coming_soon = new BehaviorSubject<number>(-1);
  private osArray = new BehaviorSubject<number[]>([-1, -1, -1]);

  public getSupportedLanguages(): Observable<string> {
    return this.supportedLanguages.asObservable();
  }

  public updateSupportedLanguages(newAppName: string): void {
    this.supportedLanguages.next(newAppName);
  }

  public getGenres(): Observable<AppOther[]> {
    return this.genres.asObservable();
  }

  public updateGenres(newGenres: AppOther[]): void {
    this.genres.next(newGenres);
  }

  public getCategories(): Observable<AppOther[]> {
    return this.categories.asObservable();
  }

  public updateCategories(newCategories: AppOther[]) {
    this.categories.next(newCategories);
  }

  public getMinMetacriticScore(): Observable<number> {
    return this.min_metacritic_score.asObservable();
  }

  public updateMinMetacriticScore(newMetacriticScore: number) {
    this.min_metacritic_score.next(newMetacriticScore);
  }

  public getComingSoon(): Observable<number> {
    return this.coming_soon.asObservable();
  }

  public updateComingSoon(newComingSoon: number) {
    this.coming_soon.next(newComingSoon);
  }

  public getOsSelection(): Observable<number[]> {
    return this.osArray.asObservable();
  }

  public updateOsSelection(selectedArray: boolean[]) {
    let counter = 0;
    for (let i = 0; i < selectedArray.length; i++) {
      if (selectedArray[i] != false) {
        break;
      }
      counter++;
    }
    if (counter == selectedArray.length) {
      this.osArray.next([-1, -1, -1]);
    } else {
      let converted: number[] = [-1, -1, -1];
      for (let i = 0; i < selectedArray.length; i++) {
        converted[i] = selectedArray[i] ? 1 : -1;
      }
      console.log(converted);
      this.osArray.next(converted);
    }
  }

  constructor() {}
}
