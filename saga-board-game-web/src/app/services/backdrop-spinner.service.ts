import { Injectable, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackdropSpinnerService {
  private onShowChanged = new Subject<boolean>();
  showChanged$ = this.onShowChanged.asObservable();

  constructor(
  ) { }

  isShowSpinner(value: boolean) {
    this.onShowChanged.next(value);
  }
}
