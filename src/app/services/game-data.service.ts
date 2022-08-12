import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http'
import { BehaviorSubject, Observable, of, ReplaySubject, Subject, switchMap, tap } from 'rxjs';
import { AppBase } from '../model/AppBase';
import { AppDetail } from '../model/AppDetail';
import { AppOther } from '../model/AppOther';
import { LanguagePipe } from '../tools/LanguagePipe';
import { SearchParameters } from '../model/SearchParameters';

const defaultParams: SearchParameters = {
  name: "",
  supportedLanguages: "",
  osSelection: [-1,-1,-1],
  min_metacritic_score: -1,
  coming_soon: -1,
  genres: "",
  categories: "",
  language: "english",
  user: ""
}
@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private apiBaseUrl = "https://main.game-reviews-api-server.net:8080"
  //private apiBaseUrl = " http://api.steampowered.com/ISteamApps"
  private batchSize = 12
  private gameListPath = "/api/appList"
  private gameDetailPath = "/api/detailList"
  private gameGenreListPath = "/api/genreList/"
  private gameLanguageListPath = "/api/languageList/"
  private gameCategoryListPath = "/api/categoryList/"
  private gameFeaturedPath = "/api/featured/"
  //private gameListPath = "/GetAppList/v0002/?format=json"
  private currentParams!: SearchParameters
  private currentIndex = 0
  private gameDataPath = this.apiBaseUrl + this.gameDetailPath
  

  private parametersSubject = new Subject<SearchParameters>()
  parameterChangeAction$ = this.parametersSubject.asObservable()
  gameData$ = this.parameterChangeAction$.pipe(switchMap(params => 
    this.http.get<AppDetail[]>(this.gameDataPath+`/getBatch/${this.currentIndex}`, {
      params: { l: this.languagePipe.transform(params.language),
                size: this.batchSize,
                name: `${params.name}`,
                supportedLanguages: `${params.supportedLanguages}`,
                windows: params.osSelection[0] == -1 ? "" : params.osSelection[0],
                mac: params.osSelection[2] == -1 ? "" : params.osSelection[2],
                linux: params.osSelection[1] == -1 ? "" : params.osSelection[1],
                min_metacritic_score: params.min_metacritic_score == -1 ? "" : params.min_metacritic_score,
                coming_soon: params.coming_soon == -1 ? "" : params.coming_soon,
                genres: params.genres,
                categories: params.categories,
                user: params.user
                 }
    })))

    
  constructor(private http: HttpClient, private languagePipe: LanguagePipe) {
  }

  modifyQueryParameters({ name,
    supportedLanguages = "",
    osSelection = [-1,-1,-1],
    min_metacritic_score = -1,
    coming_soon = -1,
    genres = "",
    categories = "",
    language = "english",
    user = ""
  }:
  { name: string,
    supportedLanguages?: string,
    osSelection?: number[],
    min_metacritic_score?: number,
    coming_soon?: number,
    genres?: string,
    categories?: string,
    language?: string,
    user?: string
  }){
    this.currentParams = {
      name,
      supportedLanguages,
      osSelection,
      min_metacritic_score,
      coming_soon,
      genres,
      categories,
      language,
      user
    }
    this.parametersSubject.next(this.currentParams)
  }

  setBatchSize(newSize: number){
    this.batchSize = newSize
  }

  getNextBatch(){
    this.currentIndex += this.batchSize
    this.parametersSubject.next(this.currentParams)
  }

   resetBatchIndex(){
    this.currentIndex = 0
   }

  getGameBaseData(): Observable<AppBase[]>{
    const buildUrl = this.apiBaseUrl + this.gameListPath
    return this.http.get<AppBase[]>(buildUrl, {
      params: { l: 'english' }
    })
  }

  resetSearch(){
    this.currentIndex = 0
    this.modifyQueryParameters(defaultParams)
  }

  getGameDetail(appid: number, language: string): Observable<AppDetail>{
    const buildUrl = this.apiBaseUrl + this.gameDetailPath
    return this.http.get<AppDetail>(buildUrl+`/${appid}`, {
      params: { l: this.languagePipe.transform(language) }})
  }

  getGameLanguages(language: string): Observable<AppOther[]>{
    const buildUrl = this.apiBaseUrl + this.gameLanguageListPath
    return this.http.get<AppOther[]>(buildUrl, {
      params: { l: this.languagePipe.transform(language)}
    })
  }

  getGameGenres(language: string): Observable<AppOther[]>{
    const buildUrl = this.apiBaseUrl + this.gameGenreListPath
    return this.http.get<AppOther[]>(buildUrl, {
      params: { l: this.languagePipe.transform(language)}
    })
  }

  getGameCategories(language: string): Observable<AppOther[]>{
    const buildUrl = this.apiBaseUrl + this.gameCategoryListPath
    return this.http.get<AppOther[]>(buildUrl, {
      params: { l: this.languagePipe.transform(language)}
    })
  }

  getFeaturedGames(language: string): Observable<AppDetail[]>{
    const buildUrl = this.apiBaseUrl + this.gameFeaturedPath
    return this.http.get<AppDetail[]>(buildUrl, {
      params: { l: this.languagePipe.transform(language)}
    })
  }

}
