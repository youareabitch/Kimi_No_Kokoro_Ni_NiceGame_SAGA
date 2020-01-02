import { Injectable } from '@angular/core';
import { Room } from '../models/room';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  currentRoom = this.socket.fromEvent<Room>('room');
  rooms = this.socket.fromEvent<Room[]>('rooms');

  constructor(
    private socket: Socket
  ) { }

  getRoom(id: string) {
    this.socket.emit('getRoom', id);
  }

  createRoom(newRoom: Room) {
    this.socket.emit('createRoom', newRoom);
  }
}
