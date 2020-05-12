import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-notes',
  templateUrl: './character-notes.component.html',
  styleUrls: ['./character-notes.component.sass']
})
export class CharacterNotesComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
