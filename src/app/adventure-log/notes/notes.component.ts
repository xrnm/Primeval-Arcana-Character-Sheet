import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {Note} from "../../note";
import {GameService} from "../../game.service";
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';

import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'adventure-log-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatMiniFabButton, MatIcon, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatFormField, MatLabel, MatInput, FormsModule]
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  addNote(){
    if(this.gameService.lock)
      return;
    this.notes.unshift({name: 'New Note', content: ''})
  }
  deleteNote(note){
    if(this.gameService.lock)
      return;
    // Splice in place so the mutation reaches the shared array (campaign or game), not a local copy.
    const index = this.notes.indexOf(note);
    if(index >= 0)
      this.notes.splice(index, 1);
  }

}
