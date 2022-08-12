import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {
  NgcCookieConsentModule,
  NgcCookieConsentConfig,
} from 'ngx-cookieconsent';
import { HammerModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { GameListComponent } from './pages/search-page/components/game-list/game-list.component';
import { GameListItemComponent } from './pages/search-page/components/game-list-item/game-list-item.component';
import { HeaderComponent } from './pages/main/components/header/header.component';
import { FeaturedGameGridComponent } from './pages/main/components/featured-game-grid/featured-game-grid.component';
import { FeaturedGameGridItemComponent } from './pages/main/components/featured-game-grid-item/featured-game-grid-item.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { DrawerComponent } from './components/navigation-drawer/navigation-drawer.component';
import { GameDataService } from './services/game-data.service';
import { NavigationDrawerService } from './services/navigation-drawer.service';
import { FilterDrawerService } from './services/filter-drawer.service';
import { SearchService } from './services/search.service';
import { LayoutModule } from '@angular/cdk/layout';
import { FilterDrawerComponent } from './components/filter-drawer/filter-drawer.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { DesktopModeService } from './services/desktop-mode.service';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { ToolbarService } from './services/toolbar.service';
import { ThemeService } from './services/theme.service';
import { FilterService } from './services/filter.service';
import { FilterOptionComponent } from './components/filter-drawer/components/filter-option/filter-option.component';
import { GameDisplayComponent } from './pages/main/components/game-display/game-display.component';
import { GenreSelectorComponent } from './components/filter-drawer/components/genre-selector/genre-selector.component';
import { CategorySelectorComponent } from './components/filter-drawer/components/category-selector/category-selector.component';
import { OperatingSystemSelectorComponent } from './components/filter-drawer/components/operating-system-selector/operating-system-selector.component';
import { LanguagePipe } from './tools/LanguagePipe';
import { CookieServiceWrapperService } from './services/cookie-service-wrapper.service';

//Firebase
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SignInComponent } from './pages/login-page/components/sign-in/sign-in.component';
import { SignUpComponent } from './pages/login-page/components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './pages/login-page/components/verify-email/verify-email.component';
import { ForgotPasswordComponent } from './pages/login-page/components/forgot-password/forgot-password.component';
import { WishlistService } from './services/wishlist.service';
import { WishlistPageComponent } from './pages/wishlist-page/wishlist-page.component';
import { ProfilePanelComponent } from './pages/wishlist-page/components/profile-panel/profile-panel.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const cookieConfig: NgcCookieConsentConfig = {
  cookie: {
    domain: 'game-finder-425ea.web.app', // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#e0e0e0',
    },
    button: {
      background: '#fff',
    },
  },
  theme: 'edgeless',
  type: 'opt-out',
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GameListComponent,
    GameListItemComponent,
    HeaderComponent,
    FeaturedGameGridComponent,
    FeaturedGameGridItemComponent,
    SearchPageComponent,
    ToolbarComponent,
    DrawerComponent,
    FilterDrawerComponent,
    SearchBarComponent,
    DetailPageComponent,
    FilterOptionComponent,
    GameDisplayComponent,
    GenreSelectorComponent,
    CategorySelectorComponent,
    OperatingSystemSelectorComponent,
    LoginPageComponent,
    SignInComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    WishlistPageComponent,
    ProfilePanelComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ScrollingModule,
    MatToolbarModule,
    MatListModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatCardModule,
    MatSidenavModule,
    LayoutModule,
    MatCheckboxModule,
    HammerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgcCookieConsentModule.forRoot(cookieConfig),
  ],
  providers: [
    GameDataService,
    NavigationDrawerService,
    FilterDrawerService,
    SearchService,
    DesktopModeService,
    ToolbarService,
    ThemeService,
    FilterService,
    LanguagePipe,
    CookieServiceWrapperService,
    WishlistService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
