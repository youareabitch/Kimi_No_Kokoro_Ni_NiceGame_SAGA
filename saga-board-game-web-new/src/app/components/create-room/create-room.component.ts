import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd';
import { FormGroup } from '@angular/forms';
import { Room } from 'src/app/models/room';
import { Socket } from 'ngx-socket-io';
import { CreateRoomValidateConfig } from 'src/app/services/validate-configs/create-room-validate.config';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  rooms = this.socket.fromEvent<Room[]>('rooms');
  playerName: string;

  /** 表單 */
  theForm: FormGroup;
  formErrors: any;

  constructor(
    private modal: NzModalRef,
    private socket: Socket,
    private validateConfig: CreateRoomValidateConfig,
    private roomService: RoomService,
  ) { }

  ngOnInit() {
    this.initForm();
  }

  /** 表單初始化 */
  initForm() {
    if (!this.theForm) {
      this.theForm = this.validateConfig.init();
      this.formErrors = this.validateConfig.formErrors;
    }
  }

  /** 建立房間 */
  createRoom() {
    const newRoom = new Room();
    newRoom.players.push({ name: this.playerName, isCreater: true })
    newRoom.roomName = this.theForm.controls.roomName.value;
    this.roomService.createRoom(newRoom);
    this.modal.close(newRoom.id);
  }

  destroyModal(): void {
    this.modal.destroy();
  }
}
