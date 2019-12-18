import { Component, OnInit } from '@angular/core';
import { LayoutService } from 'src/app/services/layout.service';
import { Operations } from 'src/app/models/enums/operations.enum';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit() {
    
  }

  /** 返回大廳 */
  backToLobby() {
    this.layoutService.changeOperation(Operations.home);
  }
}
