import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Room } from 'src/app/models/room';
import { LayoutService } from 'src/app/services/layout.service';
import { Operations } from 'src/app/models/enums/operations.enum';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {
  rooms: Room[] = [];
  displayedColumns: string[] = ['roomName', 'playersCount', 'operation'];

  constructor(
    private socket: Socket,
    private dialogRef: MatDialogRef<JoinRoomComponent>,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    this.socket.fromEvent<Room[]>('rooms').subscribe(x => this.rooms = x);

    setInterval(() => {
      this.socket.emit('getRooms');
    }, 1000);
  }

  /** 加入房間 */
  joinRoom(roomId) {
    this.socket.emit('joinRoom', roomId);
    this.dialogRef.close(roomId);
    this.layoutService.changeOperation(Operations.room);
  }
}
