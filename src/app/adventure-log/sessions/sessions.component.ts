import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {Session} from "../../session";
import {GameService} from "../../game.service";
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { DatePipe } from '@angular/common';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'adventure-log-sessions',
    templateUrl: './sessions.component.html',
    styleUrls: ['./sessions.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatMiniFabButton, MatIcon, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatFormField, MatLabel, MatInput, MatDatepickerInput, FormsModule, MatDatepickerToggle, MatSuffix, MatDatepicker, DatePipe]
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

    // Splice in place so the mutation reaches the shared array (campaign or game), not a local copy.
    const index = this.sessions.indexOf(session);
    if(index >= 0)
      this.sessions.splice(index, 1);
  }

}
