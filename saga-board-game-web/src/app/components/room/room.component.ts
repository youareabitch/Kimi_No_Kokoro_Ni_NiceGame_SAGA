import { Component, OnInit, Input } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { Operations } from 'src/app/models/enums/operations.enum';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {
  @Input() roomId: string;

  constructor(
    private socket: Socket,
    private layoutService: LayoutService
  ) { }

  ngOnInit() {

  }

  /** 返回大廳 */
  backToLobby() {
    this.socket.emit('leftRoom', this.roomId);
    this.layoutService.changeOperation(Operations.home);
  }
}
