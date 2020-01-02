import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { JoinRoomComponent } from '../join-room/join-room.component';
import { Operations } from 'src/app/models/enums/operations.enum';
import { LayoutService } from 'src/app/services/layout.service';
import { PlayerNameService } from 'src/app/services/player-name.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  /** 換頁面相關 */
  ops = Operations;
  curOp = Operations.home;

  roomId: string;

  nameSub: Subscription;
  playerName: string;

  constructor(
    private dialog: MatDialog,
    private layoutService: LayoutService,
    private playerNameService: PlayerNameService
  ) { }

  ngOnDestroy() {
    this.nameSub.unsubscribe();
  }

  ngOnInit() {
    this.layoutService.layoutChanged$.subscribe(x => this.curOp = x);
    this.nameSub = this.playerNameService.nameChanged$.subscribe(x => this.playerName = x);
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
    const dialog = this.dialog.open(CreateRoomComponent);
    dialog.componentInstance.playerName = this.playerName;
    dialog.afterClosed().subscribe(x => {
      if (x) {
        this.roomId = x;
        this.layoutService.changeOperation(Operations.room);
      }
    });
  }

  /** 開啟加入房間視窗 */
  openJoinRoomDialog() {
    const dialog = this.dialog.open(JoinRoomComponent);
    dialog.componentInstance.playerName = this.playerName;
    dialog.afterClosed().subscribe(x => {
      this.roomId = x;
      this.layoutService.changeOperation(Operations.room);
    });
  }
}
