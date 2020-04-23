import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";

@Component({
  selector: 'show-character-card',
  templateUrl: './character-card.component.html',
  styleUrls: ['./character-card.component.sass']
})
export class CharacterCardComponent implements OnInit {
  @Input character: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
