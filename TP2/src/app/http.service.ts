import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Artist} from "./artist";
import {Album} from "./album";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  private Token : string = '';

  constructor(
    public http: HttpClient
  ) {
  }

  async GetToken(): Promise<void> {
    let body = new HttpParams()
      .set('grant_type', 'client_credentials');

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('60c45faf1f8242e093a042a5666a8fe1' + ':' + '12343172390346e782ea6b142d0d63a7')
      })
    };

    let res = await lastValueFrom(this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions))

    console.log(res);
    this.Token = res.access_token;

  }

  async LoadArtist(artistName: string): Promise<Artist> {
    let artist: Artist = new Artist('', '', '');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.Token
      })
    };

    let response = await lastValueFrom(this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName, httpOptions))

        console.log(response);
        artist.id = response.artists.items[0].id;
        artist.name = response.artists.items[0].name;
        artist.img = response.artists.items[0].images[0].url;

        return artist


    
  }
}
