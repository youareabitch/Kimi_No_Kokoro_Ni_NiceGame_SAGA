import { Guid } from 'guid-typescript';

export class Room {
    id = Guid.create().toString();
    roomName: string;
    playersCount = 1;
}
