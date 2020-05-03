import { Component, OnInit, Input } from '@angular/core';
import {Session} from "../../session";

@Component({
  selector: 'adventure-log-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.sass']
})
export class SessionsComponent implements OnInit {
  @Input() sessions: Session[];
  constructor() { }

  ngOnInit(): void {
  }

  addSession(){
    this.sessions.unshift({notes: '', date: new Date(), game_date: ''})
  }
  deleteSession(session){
    this.sessions = this.sessions.filter(s => s !== session)
  }

}
