import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Room } from 'src/app/models/room';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/services/layout.service';
import { RoomService } from 'src/app/services/room.service';
import { Socket } from 'ngx-socket-io';
import { Operations } from 'src/app/models/enums/operations.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit, OnDestroy {
  @Input() roomId: string;
  @Input() playerName: string;

  room = new Room();
  isCreater: boolean;
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
      this.isCreater = this.room.players.find(x => x.name === this.playerName).isCreater;
    });
  }

  /** 返回大廳 */
  backToLobby() {
    this.socket.emit('leftRoom', { roomId: this.roomId, playerName: this.playerName });
    this.layoutService.changeOperation(Operations.home);
  }
}
