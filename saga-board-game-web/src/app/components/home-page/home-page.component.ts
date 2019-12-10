import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppTranslationService } from 'src/app/services/translate.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  title = 'saga-board-game-web';

  constructor(
    private translateService: AppTranslationService
  ) { }

  ngOnInit() {
  }

}
