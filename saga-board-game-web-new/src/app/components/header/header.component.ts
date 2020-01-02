import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PlayerNameService } from 'src/app/services/player-name.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isMenuOpen = false;
  playerName: string;

  constructor(
    private translateService: TranslateService,
    private playerNameService: PlayerNameService
    ) { }

  ngOnInit() {
    this.translateService.get(' ').subscribe(() => {
      this.playerName = this.translateService.instant('AppRoot.DefaultPlayerName') + '_' + this.getRandomNumber(0, 99999);
      this.playerNameService.setName(this.playerName);
    });
  }

  changeLanguage(lang: string) {
    this.translateService.use(lang);
  }

  playerNameChanged() {
    this.playerNameService.setName(this.playerName);
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}
