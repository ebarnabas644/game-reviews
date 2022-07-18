import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule, HttpParams } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { AppBase } from '../model/AppBase';
import { AppDetail } from '../model/AppDetail';
import { DummyGenerator } from './testData';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {
  private apiBaseUrl = "http://localhost:8080"
  //private apiBaseUrl = " http://api.steampowered.com/ISteamApps"
  private gameListPath = "/api/appList"
  private gameDetailPath = "/api/detailList"
  //private gameListPath = "/GetAppList/v0002/?format=json"
  private dummyAppDetailList: AppDetail[] = []

  constructor(private http: HttpClient) {
    this.initDummyAppDetailList()
    console.log("Dummy database constructed successfully")
   }
  

  getGameBaseData(): Observable<AppBase[]>{
    const buildUrl = this.apiBaseUrl + this.gameListPath

    return this.http.get<AppBase[]>(buildUrl, {
      params: { l: 'english' }
    })
  }

  getGameDetailBatch(size: number, name: String): Observable<AppDetail[]>{
    const buildUrl = this.apiBaseUrl + this.gameDetailPath
    console.log("Getting game detail batch")
    return this.http.get<AppDetail[]>(buildUrl+`/getBatch/0`, {
      params: { l: 'english',
                size: size,
                name: `${name}` }
    })
  }

  getGameDetail(appid: number): Observable<AppDetail>{
    const buildUrl = this.apiBaseUrl + this.gameDetailPath
    return this.http.get<AppDetail>(buildUrl+`/${appid}`, {
      params: { l: 'english' }})
  }

  //Get featured game ids
  getFeaturedGameIds(): number[]{
    return DummyGenerator.generateFeaturedGameIds()
  }

  //Get entry from app detail database based in appid
  getDummyAppDetail(id: number): AppDetail{
    return this.dummyAppDetailList[id]
  }

  getDummyAppDetailList(): Observable<AppDetail[]>{
    return of(this.dummyAppDetailList)
  }

  private initDummyAppDetailList(): AppDetail[]{
    for(var i = 0; i < 200; i++){
      this.dummyAppDetailList.push(
        { steam_appid: i,
          name: "Test"+i,
          required_age: DummyGenerator.generateRequiredAge(),
          is_free: DummyGenerator.generateIsFree(),
          detailed_description: DummyGenerator.generateDetailedDescription(),
          about_the_game: DummyGenerator.generateAboutTheGame(),
          short_description: DummyGenerator.generateShortDescription(),
          supported_languages: DummyGenerator.generateSupportedLanguages(),
          reviews: DummyGenerator.generateReviews(),
          header_image: DummyGenerator.generateHeaderImage(),
          website: DummyGenerator.generateWebsite(),
          developers: DummyGenerator.generateDevelopers(),
          publishers: DummyGenerator.generatePublishers(),
          windows: DummyGenerator.generateIsWindows(),
          mac: DummyGenerator.generateIsMac(),
          linux: DummyGenerator.generateIsLinux(),
          metacritic_score: DummyGenerator.generateMetacriticScore(), 
          metacritic_url: DummyGenerator.generateMetacriticUrl(),
          categories: DummyGenerator.generateCategories(),
          genres: DummyGenerator.generateGenres(),
          screenshots_thumbnail: DummyGenerator.generateScreenshotsThumbnail(),
          screenshots_full: DummyGenerator.generateScreenshotsFull(),
          recommendations: DummyGenerator.generateRecommendations(),
          coming_soon: DummyGenerator.generateComingSoon(),
          date: DummyGenerator.generateDate() }
        )
    }

    return this.dummyAppDetailList
  }

  
}
