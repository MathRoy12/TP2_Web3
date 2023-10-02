import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HTTPService} from "../http.service";
import {Concert} from "../concert";

@Component({
  selector: 'app-concert',
  templateUrl: './concert.component.html',
  styleUrls: ['./concert.component.scss']
})
export class ConcertComponent implements OnInit {
  artistName: string | null = '';
  concerts: Concert[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public http: HTTPService) {
  }

  async ngOnInit(): Promise<void> {
    this.artistName = this.route.snapshot.paramMap.get('artistName')

    if (this.artistName != null)
      this.concerts = await this.http.LoadConcerts(this.artistName);
  }

  LngLat(lat:number, lng:number):google.maps.LatLngLiteral{
    console.log(lat);
    let center: google.maps.LatLngLiteral = {lat: lat, lng: lng}
    return center
  }
}
