import { Component, OnInit, Input } from '@angular/core';
import {Session} from "../../session";
import {GameService} from "../../game.service";

@Component({
  selector: 'adventure-log-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.sass']
})
export class SessionsComponent implements OnInit {
  @Input() sessions: Session[];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  addSession(){
    if(this.gameService.lock)
      return;

    this.sessions.unshift({notes: '', date: new Date(), game_date: ''})
  }
  deleteSession(session){
    if(this.gameService.lock)
      return;

    this.sessions = this.sessions.filter(s => s !== session)
  }

}
