import { Component, OnInit } from '@angular/core';
import {Session} from "../session";
import {GameService} from "../game.service";
import {Router} from "@angular/router";
import {ExperienceBlock} from "../experience-block";
import {Character} from "../character";
import { NotesComponent } from './notes/notes.component';
import { SessionsComponent } from './sessions/sessions.component';
import { ExperienceBlocksComponent } from './experience-blocks/experience-blocks.component';

class Note {
}

@Component({
    selector: 'adventure-log',
    templateUrl: './adventure-log.component.html',
    styleUrls: ['./adventure-log.component.sass'],
    imports: [NotesComponent, SessionsComponent, ExperienceBlocksComponent]
})
export class AdventureLogComponent implements OnInit {
  sessions: Session[];
  notes: Note[];
  character: Character
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    if(!this.gameService.getGame())
      this.router.navigate(['']);

    this.sessions = this.gameService.getGame().getSessions();
    this.notes = this.gameService.getGame().getNotes();
    this.character = this.gameService.getGame().getCharacter();
  }
}
