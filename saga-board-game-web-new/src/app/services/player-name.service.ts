import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerNameService {
  private onNameChanged = new Subject<string>();
  nameChanged$ = this.onNameChanged.asObservable();

  currentName: string;

  constructor() { }

  setName(name: string) {
    this.onNameChanged.next(name);
  }
}
