import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Artist} from "./artist";
import {Album} from "./album";

@Injectable({
  providedIn: 'root'
})
export class HTTPService {


  constructor(
    public http: HttpClient
  ) {
  }

  async LoadArtist(artistName: string): Promise<Artist> {
    let img: string = ""
    let spotifyToken: string = '';
    let artist: Artist = new Artist('', '', '');

    let body = new HttpParams()
      .set('grant_type', 'client_credentials');

    let httpOptions1 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa('CLIENT_ID' + ':' + 'CLIENT_SECRET')
      })
    };

    this.http.post<any>('https://accounts.spotify.com/api/token', body.toString(), httpOptions1)
      .subscribe(res => {
        console.log(res);
        spotifyToken = res.access_token;
      });

    const httpOptions2 = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + spotifyToken
      })
    };

    this.http.get<any>('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName, httpOptions2)
      .subscribe(response => {
        console.log(response);
        artist.id = response.artists.items[0].id;
        artist.name = response.artists.items[0].name;
        artist.img = response.artists.items[0].images[0].url;
      });

    return artist
  }
}
