import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HTTPService} from "../http.service";
import {Album} from "../album";

@Component({
  selector: 'app-artiste',
  templateUrl: './artiste.component.html',
  styleUrls: ['./artiste.component.scss']
})
export class ArtisteComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private router:Router,
              private http: HTTPService) {
  }

  artistId: string | null = '';
  artistName: string | null = '';
  albums: Album[] = [];
  swirl: boolean[] = [];

  async ngOnInit(): Promise<void> {
    this.artistId = this.route.snapshot.paramMap.get('artistId');
    this.artistName = this.route.snapshot.paramMap.get('artistName');
    await this.http.GetToken()
    if (this.artistId != null) {
      this.albums = await this.http.LoadAlbums(this.artistId)
    }

    for (let i = 0; i < this.albums.length; i++) {
      setTimeout(() => {
        this.swirl[i] = true;
      }, i * 250);
    }
  }

  albumClick(album:Album): void {
    this.router.navigate([this.artistName,this.artistId,"albums",album.name,album.id])
  }
}
