import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { AppBase } from '../model/AppBase';
import { AppDetail } from '../model/AppDetail';
import { AppOther } from '../model/AppOther';

const batchSize = 30;
@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private apiBaseUrl = "http://localhost:8080"
  //private apiBaseUrl = " http://api.steampowered.com/ISteamApps"
  private gameListPath = "/api/appList"
  private gameDetailPath = "/api/detailList"
  private gameGenreListPath = "/api/genreList/"
  private gameLanguageListPath = "/api/languageList/"
  private gameCategoryListPath = "/api/categoryList/"
  private gameFeaturedPath = "/api/featured/"
  //private gameListPath = "/GetAppList/v0002/?format=json"
  private currentIndex = -batchSize
  

  constructor(private http: HttpClient) {
   }

   resetBatchIndex(){
    this.currentIndex = -batchSize
   }

  getGameBaseData(): Observable<AppBase[]>{
    const buildUrl = this.apiBaseUrl + this.gameListPath
    return this.http.get<AppBase[]>(buildUrl, {
      params: { l: 'english' }
    })
  }

  getGameDetailBatch(
    { name,
      supportedLanguages = "",
      osSelection = [-1,-1,-1],
      min_metacritic_score = -1,
      coming_soon = -1,
      genres = "",
      categories = ""
    }:
    { name: string,
      supportedLanguages?: string,
      osSelection?: number[],
      min_metacritic_score?: number,
      coming_soon?: number,
      genres?: string,
      categories?: string
    }): Observable<AppDetail[]>{
    const buildUrl = this.apiBaseUrl + this.gameDetailPath
    console.log("Getting game detail batch, current index: "+this.currentIndex)
    return this.http.get<AppDetail[]>(buildUrl+`/getBatch/${this.currentIndex+=batchSize}`, {
      params: { l: 'english',
                size: batchSize,
                name: `${name}`,
                supportedLanguages: `${supportedLanguages}`,
                windows: osSelection[0] == -1 ? "" : osSelection[0],
                mac: osSelection[2] == -1 ? "" : osSelection[2],
                linux: osSelection[1] == -1 ? "" : osSelection[1],
                min_metacritic_score: min_metacritic_score == -1 ? "" : min_metacritic_score,
                coming_soon: coming_soon == -1 ? "" : coming_soon,
                genres: genres,
                categories: categories
                 }
    })
  }

  getGameDetail(appid: number): Observable<AppDetail>{
    const buildUrl = this.apiBaseUrl + this.gameDetailPath
    return this.http.get<AppDetail>(buildUrl+`/${appid}`, {
      params: { l: 'english' }})
  }

  getGameLanguages(): Observable<AppOther[]>{
    const buildUrl = this.apiBaseUrl + this.gameLanguageListPath
    return this.http.get<AppOther[]>(buildUrl, {
      params: { l: 'english'}
    })
  }

  getGameGenres(): Observable<AppOther[]>{
    const buildUrl = this.apiBaseUrl + this.gameGenreListPath
    return this.http.get<AppOther[]>(buildUrl, {
      params: { l: 'english'}
    })
  }

  getGameCategories(): Observable<AppOther[]>{
    const buildUrl = this.apiBaseUrl + this.gameCategoryListPath
    return this.http.get<AppOther[]>(buildUrl, {
      params: { l: 'english'}
    })
  }

  getFeaturedGames(): Observable<AppDetail[]>{
    const buildUrl = this.apiBaseUrl + this.gameFeaturedPath
    return this.http.get<AppDetail[]>(buildUrl, {
      params: { l: 'english'}
    })
  }

}
