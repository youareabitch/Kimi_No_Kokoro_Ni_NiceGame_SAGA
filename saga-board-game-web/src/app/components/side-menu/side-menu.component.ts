import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AppTranslationService } from 'src/app/services/translate.service';
import { MenuPositionX } from '@angular/material/menu';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  constructor(
    private appTranslateService: AppTranslationService
  ) { }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    this.appTranslateService.changeLanguage(lang);
  }
}
