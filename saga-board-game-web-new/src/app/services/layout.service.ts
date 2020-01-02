import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Operations } from '../models/enums/operations.enum';

@Injectable()
export class LayoutService {
  private onLayoutChanged = new Subject<Operations>();
  layoutChanged$ = this.onLayoutChanged.asObservable();

  constructor() { }

  changeOperation(operation: Operations) {
    this.onLayoutChanged.next(operation);
  }
}
