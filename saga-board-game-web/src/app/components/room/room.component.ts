import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { Operations } from 'src/app/models/enums/operations.enum';
import { Socket } from 'ngx-socket-io';
import { RoomService } from 'src/app/services/room.service';
import { Room } from 'src/app/models/room';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  @Input() roomId: string;
  @Input() playerName: string;

  room = new Room();
  private roomSub: Subscription;

  constructor(
    private socket: Socket,
    private roomService: RoomService,
    private layoutService: LayoutService
  ) { }

  ngOnDestroy() {
    this.roomSub.unsubscribe();
  }

  ngOnInit() {
    this.roomService.getRoom(this.roomId);
    this.roomSub = this.roomService.currentRoom.subscribe(x => {
      this.room = x;
    });
  }

  /** 返回大廳 */
  backToLobby() {
    this.socket.emit('leftRoom', { roomId: this.roomId, playerName: this.playerName });
    this.layoutService.changeOperation(Operations.home);
  }
}
