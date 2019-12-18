import { Component, OnInit } from '@angular/core';
import { CreateRoomValidateConfig } from 'src/app/services/validate-configs/create-room-validate.config';
import { FormGroup } from '@angular/forms';
import { Socket } from 'ngx-socket-io';
import { Room } from 'src/app/models/room';
import { LayoutService } from 'src/app/services/layout.service';
import { Operations } from 'src/app/models/enums/operations.enum';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss']
})
export class CreateRoomComponent implements OnInit {
  rooms = this.socket.fromEvent<Room[]>('rooms');

  /** 表單 */
  theForm: FormGroup;
  formErrors: any;

  constructor(
    private socket: Socket,
    private validateConfig: CreateRoomValidateConfig,
    private layoutService: LayoutService
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
    newRoom.roomName = this.theForm.controls.roomName.value;
    this.socket.emit('createRoom', newRoom);
    this.layoutService.changeOperation(Operations.room);
  }
}
