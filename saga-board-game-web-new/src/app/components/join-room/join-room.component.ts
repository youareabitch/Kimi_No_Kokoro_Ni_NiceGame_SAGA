import { Component, OnInit, OnDestroy } from '@angular/core';
import { Room } from 'src/app/models/room';
import { Subscription } from 'rxjs';
import { Socket } from 'ngx-socket-io';
import { NzModalRef, NzMessageService, NzMessageDataOptions } from 'ng-zorro-antd';
import { TranslateService } from '@ngx-translate/core';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  playerName: string;
  joinEventSub: Subscription;
  roomsSub: Subscription;

  constructor(
    private socket: Socket,
    private modal: NzModalRef,
    private translateService: TranslateService,
    private message: NzMessageService
  ) { }

  ngOnDestroy() {
    this.joinEventSub.unsubscribe();
    this.roomsSub.unsubscribe();
  }

  ngOnInit() {
    this.roomsSub = this.socket.fromEvent<Room[]>('rooms').subscribe(x => this.rooms = x);

    setInterval(() => {
      this.socket.emit('getRooms');
    }, 1000);
  }

  /** 加入房間 */
  joinRoom(roomId) {
    this.socket.emit('joinRoom', { roomId, player: { name: this.playerName, isCreater: false } as Player });
    this.joinEventSub = this.socket.fromEvent<boolean>('result').subscribe(x => {
      if (x) {
        this.modal.close(roomId);
      } else {
        this.message.create('danger', this.translateService.instant('JoinRoom.JoinFailed') + this.translateService.instant('JoinRoom.PlayersFull'))
      }
    });
  }
}
