import { Component, OnInit, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { JoinRoomComponent } from '../join-room/join-room.component';
import { Operations } from 'src/app/models/enums/operations.enum';
import { LayoutService } from 'src/app/services/layout.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  ops = Operations;
  curOp = Operations.home;

  constructor(
    private dialog: MatDialog,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.layoutService.layoutChanged$.subscribe(x => this.curOp = x);
  }

  /** 開啟登入視窗 */
  openSignInDialog() {
    this.dialog.open(SignInComponent);
  }

  /** 開啟註冊視窗 */
  openSignUpDialog() {
    this.dialog.open(SignUpComponent);
  }

  /** 開啟創立房間視窗 */
  openCreateRoomDialog() {
    this.dialog.open(CreateRoomComponent);
  }

  /** 開啟加入房間視窗 */
  openJoinRoomDialog() {
    this.dialog.open(JoinRoomComponent);
  }
}
