import { Injectable } from '@angular/core';
import {Artist} from "./artist";

@Injectable({
  providedIn: 'root'
})
export class ArtistsService {
  lstArtists:Artist[] = []
  constructor() {
    if(localStorage["Artists"])
      this.lstArtists = JSON.parse(localStorage["Artists"])
  }
}
