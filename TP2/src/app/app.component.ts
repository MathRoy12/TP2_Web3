import {Component} from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    public router:Router,
    public translate: TranslateService
  ) {
    translate.setDefaultLang('fr');
  }

  logoClick(){
    this.router.navigate(["/accueil"])
  }
  useLanguage(language: string) {
    this.translate.use(language);
  }
}
