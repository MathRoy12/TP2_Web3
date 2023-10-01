import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Artist} from "./artist";
import {Album} from "./album";
import {lastValueFrom} from "rxjs";
import {Song} from "./song";

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  private Token: string = '';
  private GoogleApiKey = 'AIzaSyB8WPU_Tn_FIyoWQMFfxgsDu1G6960WKas'

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

  async LoadAlbums(artistId: string): Promise<Album[]> {
    let albums: Album[] = []

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.Token
      })
    };

    let result = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album&limit=50`, httpOptions))

    result.items.forEach((album: any) => {
      albums.push(new Album(album.name, album.images[0].url, album.id));
    });

    return albums
  }

  async LoadSong(albumId: string): Promise<Song[]> {
    let songs: Song[] = [];

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.Token
      })
    };

    let result = await lastValueFrom(this.http.get<any>(`https://api.spotify.com/v1/albums/${albumId}`, httpOptions));

    console.log(result);
    result.tracks.items.forEach((track: any) => {
      songs.push(new Song(track.id, track.name));
    });

    return songs;
  }

  async GetYoutubeId(songName: string, artistName: string | null): Promise<string> {
    let result = await lastValueFrom(this.http.get<any>(`https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=${this.GoogleApiKey}&q=${songName + " " + artistName}`
    ));
    console.log(result.items[0].id.videoId)
    return result.items[0].id.videoId;
  }
}
