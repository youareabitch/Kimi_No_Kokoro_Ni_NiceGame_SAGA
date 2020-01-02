import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;

  constructor(
    private translateService: TranslateService
  ) { }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
