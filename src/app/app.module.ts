import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
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
    DetailPageComponent
  ],
  imports: [
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
    LayoutModule
  ],
  providers: [GameDataService, NavigationDrawerService, FilterDrawerService, SearchService, DesktopModeService],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
