import { Component, OnInit, OnDestroy } from '@angular/core';
import { Operations } from 'src/app/models/enums/operations.enum';
import { LayoutService } from 'src/app/services/layout.service';
import { PlayerNameService } from 'src/app/services/player-name.service';
import { Subscription } from 'rxjs';
import { NzModalService } from 'ng-zorro-antd';
import { CreateRoomComponent } from '../create-room/create-room.component';
import { TranslateService } from '@ngx-translate/core';
import { JoinRoomComponent } from '../join-room/join-room.component';

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
    private layoutService: LayoutService,
    private playerNameService: PlayerNameService,
    private modalService: NzModalService,
    private translateService: TranslateService
  ) { }

  ngOnDestroy() {
    this.nameSub.unsubscribe();
  }

  ngOnInit() {
    this.layoutService.layoutChanged$.subscribe(x => this.curOp = x);
    this.nameSub = this.playerNameService.nameChanged$.subscribe(x => this.playerName = x);
  }

  /** 開啟創立房間視窗 */
  openCreateRoomDialog() {
    const modal = this.modalService.create({
      nzContent: CreateRoomComponent,
      nzTitle: this.translateService.instant('HomePage.CreateRoom')
    });

    modal.afterClose.subscribe(x => {
      if (x) {
        this.roomId = x;
        this.layoutService.changeOperation(Operations.room);
      }
    })
  }

  /** 開啟加入房間視窗 */
  openJoinRoomDialog() {
    const modal = this.modalService.create({
      nzContent: JoinRoomComponent,
      nzTitle: this.translateService.instant('HomePage.JoinRoom'),
      nzWidth:'70vw'
    });

    modal.afterClose.subscribe(x => {
      if (x) {
        this.roomId = x;
        this.layoutService.changeOperation(Operations.room);
      }
    })
  }
}
