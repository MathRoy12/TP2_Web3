import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AccueilComponent} from './accueil/accueil.component';
import {ArtisteComponent} from './artiste/artiste.component';
import {AlbumComponent} from './album/album.component';
import {ConcertComponent} from './concert/concert.component';
import {YouTubePlayerModule} from "@angular/youtube-player";
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import {GoogleMapsModule} from "@angular/google-maps";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ArtisteComponent,
    AlbumComponent,
    ConcertComponent,
    YoutubePlayerComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    YouTubePlayerModule,
    GoogleMapsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/accueil', pathMatch: 'full'},
      {path: 'accueil', component: AccueilComponent},
      {path: ':artistName/:artistId/albums', component: ArtisteComponent},
      {path: ':artistName/:artistId/albums/:albumName/:albumId', component: AlbumComponent},
      {path: ':artistName/concerts', component: ConcertComponent},
      {path:'**', component:AccueilComponent}
    ]),
    TranslateModule.forRoot({
      loader:{
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps:[HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
