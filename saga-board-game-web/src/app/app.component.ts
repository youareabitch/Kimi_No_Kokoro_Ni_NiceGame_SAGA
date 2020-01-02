import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { BackdropSpinnerService } from './services/backdrop-spinner.service';
import { TranslateService } from '@ngx-translate/core';
import { PlayerNameService } from './services/player-name.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('backdropSpinner', { static: true }) backdropSpinner: TemplateRef<any>;
  overlayRef: OverlayRef;

  playerName: string;

  private gT = (key: string) => this.translate.instant(key);

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private backdropSpinnerService: BackdropSpinnerService,
    private translate: TranslateService,
    private playerNameService: PlayerNameService
  ) { }

  ngOnInit() {
    this.translate.get(' ').subscribe(() => {
      this.playerName = this.gT('AppRoot.DefaultPlayerName') + '_' + this.getRandomNumber(0, 99999);
      this.playerNameService.setName(this.playerName);
    });

    this.initBackdropSpinner();
  }

  playerNameChanged() {
    this.playerNameService.setName(this.playerName);
  }

  /** 初始化Loading Overlay */
  initBackdropSpinner() {
    const strategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({
      positionStrategy: strategy,
      hasBackdrop: true
    });

    this.backdropSpinnerService.showChanged$.subscribe(x => {
      if (x) {
        this.overlayRef.attach(new TemplatePortal(this.backdropSpinner, this.viewContainerRef));
      } else {
        this.overlayRef.detach();
      }
    });
  }

  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
}
