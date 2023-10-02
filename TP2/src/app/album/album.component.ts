import {Component, OnInit} from '@angular/core';
import {Artist} from "../artist";
import {Song} from "../song";
import {ActivatedRoute, Router} from "@angular/router";
import {HTTPService} from "../http.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  artistId: string | null = '';
  artistName: string | null = '';
  albumId: string | null = '';
  albumName: String | null = '';
  isYoutubeVisible: boolean = false;
  videoId:string = '';
  songs: Song[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public http: HTTPService) {
  }

  async songClick(songName: string): Promise<void> {
    if (!this.isYoutubeVisible){
      this.isYoutubeVisible = true;
    }

    this.videoId = await this.http.GetYoutubeId(songName, this.artistName);
  }

  async ngOnInit(): Promise<void> {
    this.artistId = this.route.snapshot.paramMap.get("artistId");
    this.artistName = this.route.snapshot.paramMap.get("artistName");
    this.albumId = this.route.snapshot.paramMap.get("albumId");
    this.albumName = this.route.snapshot.paramMap.get("albumName");

    await this.http.GetToken();
    if (this.albumId != null) {
      this.songs = await this.http.LoadSongs(this.albumId);
    }
    console.log(this.songs);
  }
}
