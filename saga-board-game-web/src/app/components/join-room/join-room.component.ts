import { Component, OnInit, OnDestroy } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from 'src/app/models/room';
import { LayoutService } from 'src/app/services/layout.service';
import { Operations } from 'src/app/models/enums/operations.enum';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Player } from 'src/app/models/player';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit, OnDestroy {
  rooms: Room[] = [];
  displayedColumns: string[] = ['roomName', 'playersCount', 'operation'];

  playerName: string;

  joinEventSub: Subscription;

  private gT = (key: string) => this.translate.instant(key);

  constructor(
    private socket: Socket,
    private dialogRef: MatDialogRef<JoinRoomComponent>,
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private layoutService: LayoutService
  ) { }

  ngOnDestroy() {
    this.joinEventSub.unsubscribe();
  }

  ngOnInit() {
    this.socket.fromEvent<Room[]>('rooms').subscribe(x => this.rooms = x);

    setInterval(() => {
      this.socket.emit('getRooms');
    }, 1000);
  }

  /** 加入房間 */
  joinRoom(roomId) {
    this.socket.emit('joinRoom', { roomId, player: { name: this.playerName, isCreater: false } as Player });
    this.joinEventSub = this.socket.fromEvent<boolean>('result').subscribe(x => {
      if (x) {
        this.dialogRef.close(roomId);
      } else {
        this.snackBar.open(this.gT('JoinRoom.JoinFailed') + this.gT('JoinRoom.PlayersFull'), '', { duration: 2000, panelClass: 'bg-danger' });
      }
    });
  }
}
