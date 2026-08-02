import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {Session} from "../session";
import {Note} from "../note";
import {Beast} from "../beast";
import {GameService} from "../game.service";
import {CampaignService} from "../campaign.service";
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import { NotesComponent } from './notes/notes.component';
import { SessionsComponent } from './sessions/sessions.component';
import { BestiaryComponent } from './bestiary/bestiary.component';

@Component({
    selector: 'adventure-log',
    templateUrl: './adventure-log.component.html',
    styleUrls: ['./adventure-log.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [NotesComponent, SessionsComponent, BestiaryComponent]
})
export class AdventureLogComponent implements OnInit {
  sessions: Session[];
  notes: Note[];
  bestiary: Beast[];
  campaignName: string = '';
  constructor(private gameService: GameService, private campaignService: CampaignService,
              private authService: AuthService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    // A refresh activates this route before startup has restored the session and campaign. Without
    // waiting, both sources look empty and we bounce the user to root instead of their log.
    await this.authService.ready();
    if (this.authService.isAuthenticated())
      await this.campaignService.restoreActive();

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
    this.bestiary = campaignActive ? this.campaignService.getBestiary() : this.gameService.getGame().getBestiary();
  }
}
