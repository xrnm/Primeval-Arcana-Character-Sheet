import { Component, OnInit } from '@angular/core';
import {Session} from "../session";
import {GameService} from "../game.service";

class Note {
}

@Component({
  selector: 'adventure-log',
  templateUrl: './adventure-log.component.html',
  styleUrls: ['./adventure-log.component.sass']
})
export class AdventureLogComponent implements OnInit {
  sessions: Session[];
  notes: Note[];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.sessions = this.gameService.getSessions();
    this.notes = this.gameService.getNotes();
  }

}
