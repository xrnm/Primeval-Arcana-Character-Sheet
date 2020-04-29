import { Component, OnInit, Input } from '@angular/core';
import {Note} from "../../note";

@Component({
  selector: 'adventure-log-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {
  @Input() notes: Note[];
  constructor() { }

  ngOnInit(): void {
  }

}
