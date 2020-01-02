import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayModule, OverlayContainer } from '@angular/cdk/overlay';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BackdropSpinnerService } from './services/backdrop-spinner.service';
import { ScoreMapComponent } from './components/score-map/score-map.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppTranslationService } from './services/translate.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SideMenuComponent } from './components/side-menu/side-menu.component';
import { MatDividerModule } from '@angular/material/divider';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignUpValidateConfig } from './services/validate-configs/sign-up-validate.config';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SignInValidateConfig } from './services/validate-configs/sign-in-validate.config';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { CreateRoomValidateConfig } from './services/validate-configs/create-room-validate.config';
import { JoinRoomComponent } from './components/join-room/join-room.component';
import { MatTableModule } from '@angular/material/table';
import { RoomComponent } from './components/room/room.component';
import { LayoutService } from './services/layout.service';
import { NgZorroAntdModule, NZ_I18N, zh_TW } from 'ng-zorro-antd';

/** Angualr 多語系 */
import { registerLocaleData } from '@angular/common';
import zhHant from '@angular/common/locales/zh-Hant';
import { PlayerNameService } from './services/player-name.service';
import { RoomService } from './services/room.service';
registerLocaleData(zhHant);

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

import { IconDefinition } from '@ant-design/icons-angular';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import * as AllIcons from '@ant-design/icons-angular/icons';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    ScoreMapComponent,
    HomePageComponent,
    SideMenuComponent,
    SignInComponent,
    SignUpComponent,
    CreateRoomComponent,
    JoinRoomComponent,
    RoomComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OverlayModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatDividerModule,
    NgScrollbarModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    NgZorroAntdModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    BackdropSpinnerService,
    SignUpValidateConfig,
    SignInValidateConfig,
    CreateRoomValidateConfig,
    LayoutService,
    PlayerNameService,
    RoomService,
    { provide: NZ_I18N, useValue: zh_TW },
    { provide: NZ_ICONS, useValue: icons }
  ],
  entryComponents: [
    SignInComponent,
    SignUpComponent,
    CreateRoomComponent,
    JoinRoomComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private translateService: TranslateService,
    private appTranslate: AppTranslationService,
  ) {
    this.translateService.use(appTranslate.getBrowserLanguage());
    appTranslate.languageChanged$.subscribe(lang => {
      translateService.use(lang);
    });

  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
