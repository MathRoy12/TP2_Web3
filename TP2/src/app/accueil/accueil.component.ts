import {Component} from '@angular/core';
import {ArtistsService} from "../artists.service";
import {HTTPService} from "../http.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  newArtist: string = '';

  constructor(public data:ArtistsService,
              public http: HTTPService) {
  }

  async AddArtist(name: string) {
    await this.http.GetToken()

    this.data.lstArtists.push(await this.http.LoadArtist(name))
    localStorage["Artists"] = JSON.stringify(this.data.lstArtists) ;
    this.newArtist = '';
  }
}
