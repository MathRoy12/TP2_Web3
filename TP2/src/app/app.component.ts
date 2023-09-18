import {Component} from '@angular/core';
import {HTTPService} from "./http.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  aritsteCourant: string = "Megadeth"

  constructor(
    public HTTPServ: HTTPService
  ) {
  }
}
