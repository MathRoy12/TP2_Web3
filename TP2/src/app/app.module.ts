import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ArtisteComponent } from './artiste/artiste.component';
import { AlbumComponent } from './album/album.component';
import { ConcertComponent } from './concert/concert.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ArtisteComponent,
    AlbumComponent,
    ConcertComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
