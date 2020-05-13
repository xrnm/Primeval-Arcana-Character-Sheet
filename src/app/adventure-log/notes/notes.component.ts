import { Component, OnInit, Input } from '@angular/core';
import {Note} from "../../note";
import {GameService} from "../../game.service";

@Component({
  selector: 'adventure-log-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
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
    this.notes = this.notes.filter(n => n !== note)
  }

}
