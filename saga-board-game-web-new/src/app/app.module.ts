import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgZorroAntdModule, NZ_I18N, zh_TW } from 'ng-zorro-antd';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import zhTw from '@angular/common/locales/zh-Hant';
import zhCn from '@angular/common/locales/zh-Hans';
import jp from '@angular/common/locales/ja';
import { HeaderComponent } from './components/header/header.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppTranslateService } from './services/app-translate.service';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LayoutService } from './services/layout.service';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CreateRoomComponent } from './components/create-room/create-room.component';
import { MatInputModule } from '@angular/material/input';
import { CreateRoomValidateConfig } from './services/validate-configs/create-room-validate.config';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RoomComponent } from './components/room/room.component';
import { JoinRoomComponent } from './components/join-room/join-room.component';

registerLocaleData(zhTw);
registerLocaleData(zhCn);
registerLocaleData(jp);

const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomePageComponent,
    CreateRoomComponent,
    RoomComponent,
    JoinRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgScrollbarModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
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
    { provide: NZ_I18N, useValue: zh_TW },
    LayoutService,
    CreateRoomValidateConfig
  ],
  entryComponents: [
    CreateRoomComponent,
    JoinRoomComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private translateService: TranslateService,
    private appTranslate: AppTranslateService,
  ) {
    translateService.use(translateService.getBrowserCultureLang());
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}