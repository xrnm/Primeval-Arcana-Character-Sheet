import { Component, OnInit } from '@angular/core';
import {Session} from "../session";
import {GameService} from "../game.service";
import {Router} from "@angular/router";

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
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    if(!this.gameService.getGame())
      this.router.navigate(['']);

    this.sessions = this.gameService.getGame().getSessions();
    this.notes = this.gameService.getGame().getNotes();
  }

}
