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

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main/main-page/main-page.component';
import { GameListComponent } from './pages/main/components/game-list/game-list.component';
import { GameListItemComponent } from './pages/main/components/game-list-item/game-list-item.component';
import { HeaderComponent } from './pages/main/components/header/header.component';
import { FeaturedGameGridComponent } from './pages/main/components/featured-game-grid/featured-game-grid.component';
import { FeaturedGameGridItemComponent } from './pages/main/components/featured-game-grid-item/featured-game-grid-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GameListComponent,
    GameListItemComponent,
    HeaderComponent,
    FeaturedGameGridComponent,
    FeaturedGameGridItemComponent
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
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
