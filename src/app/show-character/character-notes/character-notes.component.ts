import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import { MatCard } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'character-notes',
    templateUrl: './character-notes.component.html',
    styleUrls: ['./character-notes.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, FormsModule]
})
export class CharacterNotesComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
