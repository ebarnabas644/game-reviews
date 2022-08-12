import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { AppDetail } from '../model/AppDetail';
import { FavouriteState } from '../model/FavouriteState';
import { AuthService } from './auth.service';

const defaultStateResponse: FavouriteState = {
  found: false
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private apiBaseUrl = "https://main.game-reviews-api-server.net:8080"
  private wishListPath = "/api/favouriteList/"
  private favourite = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFavouriteCache(): Observable<boolean>{
    return this.favourite.asObservable()
  }

  toggleFavouriteCache(newFavourite: boolean){
    this.favourite.next(newFavourite)
  }

  getFavouriteState(steam_appid: number): Observable<FavouriteState>{
    if(this.authService.isLoggedIn && this.authService.userData){
      return this.http.get<FavouriteState>(this.apiBaseUrl+this.wishListPath, {
        params: {
          appid: steam_appid,
          uid: this.authService.userData.uid
        }
      })
    }
    return of(defaultStateResponse)
  }

  setFavouriteState(steam_appid: number, isFavourite: boolean){
    if(this.authService.isLoggedIn){
      const data = JSON.stringify({
        "steam_appid": steam_appid,
        "user": this.authService.userData.uid
      })
      const config = { headers: new HttpHeaders().set('Content-Type', 'application/json') };
      if(isFavourite){
        return this.http.post<any>(this.apiBaseUrl+this.wishListPath, data, config)
      }
      else{
        return this.http.request('DELETE', this.apiBaseUrl+this.wishListPath, {
          headers: new HttpHeaders().set('Content-Type', 'application/json'),
          body: data
        })
      }
    }
    return
  }

}
