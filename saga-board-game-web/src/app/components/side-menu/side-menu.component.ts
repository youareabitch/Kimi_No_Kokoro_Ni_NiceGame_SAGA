import { Component, OnInit, Input } from '@angular/core';
import { AppTranslationService } from 'src/app/services/translate.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  constructor(
    private appTranslateService: AppTranslationService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('cn-flag', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/country/cn.svg'));
    iconRegistry.addSvgIcon('jp-flag', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/country/jp.svg'));
    iconRegistry.addSvgIcon('tw-flag', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/country/tw.svg'));
    iconRegistry.addSvgIcon('us-flag', sanitizer.bypassSecurityTrustResourceUrl('assets/icons/country/us.svg'));
  }

  ngOnInit() {
  }

  changeLanguage(lang: string) {
    this.appTranslateService.changeLanguage(lang);
  }
}
