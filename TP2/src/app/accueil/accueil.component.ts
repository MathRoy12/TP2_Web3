import {Component, OnInit} from '@angular/core';
import {HTTPService} from "../http.service";
import {Artist} from "../artist";/*
import localStorage from "$GLOBAL$";
import JSON from "$GLOBAL$";
import name from "$GLOBAL$";
import Error from "$GLOBAL$";
import JSON from "$GLOBAL$";*/

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {
  newArtist: string = '';
  lstArtists: Artist[] = [];
  swirl:boolean[] = [];

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
    this.swirl.push(true);
    localStorage["Artists"] = JSON.stringify(this.lstArtists);
    this.newArtist = '';
  }

  ngOnInit(): void {
    for (let i = 0; i < this.lstArtists.length; i++) {
      setTimeout(() => { this.swirl[i] = true; }, i * 250);
    }
  }
}
