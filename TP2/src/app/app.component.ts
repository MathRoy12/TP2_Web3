import {Component, OnInit} from '@angular/core';
import {HTTPService} from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    public HTTPServ: HTTPService
  ) {
  }

  ngOnInit(): void {
    this.HTTPServ.GetToken();
  }
}
