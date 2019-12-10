import { Component, OnInit, ViewContainerRef, TemplateRef, ViewChild } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { BackdropSpinnerService } from './services/backdrop-spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('backdropSpinner', { static: true }) backdropSpinner: TemplateRef<any>;

  overlayRef: OverlayRef;

  constructor(
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private backdropSpinnerService: BackdropSpinnerService,
  ) { }

  ngOnInit() {
    this.initBackdropSpinner();
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
}
