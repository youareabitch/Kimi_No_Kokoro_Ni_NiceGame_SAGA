import { Guid } from 'guid-typescript';
import { Player } from './player';

export class Room {
    id = Guid.create().toString();
    roomName: string;
    playersCount = 1;
    players: Player[] = []
}
