import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-score-map',
  templateUrl: './score-map.component.html',
  styleUrls: ['./score-map.component.scss']
})
export class ScoreMapComponent implements OnInit {
  currentDocument = this.socket.fromEvent<Document>('document');
  documents = this.socket.fromEvent<string[]>('documents');

  id = 0;

  constructor(
    private socket: Socket
  ) { }

  ngOnInit() {
    this.socket.emit('addDoc', { id: '1234', doc: 'ttttttttt' });
    this.socket.emit('getDoc', '1234');

    const abc = Guid.create();
    console.log(abc.toJSON());
    console.log(abc.toString());
    console.log(abc.isEmpty());
  }

  newDoc() {
    this.id++;
    this.socket.emit('addDoc', { id: this.id.toString(), doc: 'ttttttttt' });
  }
}
