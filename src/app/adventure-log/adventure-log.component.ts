import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Session} from "../session";
import {Note} from "../note";
import {GameService} from "../game.service";
import {CampaignService} from "../campaign.service";
import {Router} from "@angular/router";
import { NotesComponent } from './notes/notes.component';
import { SessionsComponent } from './sessions/sessions.component';

@Component({
    selector: 'adventure-log',
    templateUrl: './adventure-log.component.html',
    styleUrls: ['./adventure-log.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NotesComponent, SessionsComponent]
})
export class AdventureLogComponent implements OnInit {
  sessions: Session[];
  notes: Note[];
  campaignName: string = '';
  constructor(private gameService: GameService, private campaignService: CampaignService, private router: Router) { }

  ngOnInit(): void {
    // In account mode the session log + notes belong to the campaign (shared by the party);
    // anonymously they live on the single character's game.
    const campaignActive = this.campaignService.hasActive();
    if(!this.gameService.getGame() && !campaignActive){
      this.router.navigate(['']);
      return;
    }

    this.campaignName = this.campaignService.activeCampaign?.name || '';
    this.sessions = campaignActive ? this.campaignService.getSessions() : this.gameService.getGame().getSessions();
    this.notes = campaignActive ? this.campaignService.getNotes() : this.gameService.getGame().getNotes();
  }
}
