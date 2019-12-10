
import { Injectable } from '@angular/core';
import { TranslateService, TranslateLoader } from '@ngx-translate/core';
import { Observable, Subject, of } from 'rxjs';
import { KeyValue } from '../models/interfaces/key-value';

@Injectable({
  providedIn: 'root'
})
export class AppTranslationService {
  private onLanguageChanged = new Subject<string>();
  languageChanged$ = this.onLanguageChanged.asObservable();
  appLangs: KeyValue[] = [
    { key: 'zh-TW', value: '繁中' },
    { key: 'zh-CN', value: '简中' },
    { key: 'en', value: 'English' },
    { key: 'jp', value: '日本語' }
  ];

  constructor(private translate: TranslateService) {
    const langs = this.appLangs.map(l => l.key);
    this.addLanguages(langs);
    this.setDefaultLanguage('zh-TW');
  }

  addLanguages(lang: string[]) {
    this.translate.addLangs(lang);
  }

  setDefaultLanguage(lang: string) {
    this.translate.setDefaultLang(lang);
    this.translate.use(lang);
  }

  getDefaultLanguage() {
    return this.translate.defaultLang;
  }

  getBrowserLanguage() {
    return this.translate.getBrowserCultureLang();
  }

  getCurrentLanguage() {
    return this.translate.currentLang;
  }

  getLoadedLanguages() {
    return this.translate.langs;
  }

  useBrowserLanguage(): string | void {
    const browserLang = this.getBrowserLanguage();

    if (browserLang.match(/zh-TW|zh-CN/)) {
      this.changeLanguage(browserLang);
      return browserLang;
    }
  }

  useDefaultLangage() {
    return this.changeLanguage(null);
  }

  changeLanguage(language: string) {
    if (!language) {
      language = this.getDefaultLanguage();
    }

    if (language !== this.translate.currentLang) {
      setTimeout(() => {
        this.translate.use(language);
        this.onLanguageChanged.next(language);
      });
    }

    return language;
  }
}
