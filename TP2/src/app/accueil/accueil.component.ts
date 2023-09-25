import {Component} from '@angular/core';
import {HTTPService} from "../http.service";
import {Artist} from "../artist";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
  newArtist: string = '';
  lstArtists: Artist[] = [];

  constructor(public http: HTTPService) {
    if (!(localStorage["Artists"] == null ||
      localStorage["Artists"] == undefined ||
      localStorage["Artists"] == ''))
      this.lstArtists = JSON.parse(localStorage["Artists"]);
  }

  async AddArtist(name: string) {
    await this.http.GetToken()
    let artistToAdd: Artist = await this.http.LoadArtist(name);

    if (this.lstArtists.length != 0)
      for (let item of this.lstArtists)
        if (item.name === artistToAdd.name)
          throw new Error()

    this.lstArtists.push(artistToAdd);
    localStorage["Artists"] = JSON.stringify(this.lstArtists);
    this.newArtist = '';
  }
}
