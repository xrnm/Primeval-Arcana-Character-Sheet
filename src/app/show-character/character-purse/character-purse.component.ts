import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";

@Component({
  selector: 'character-purse',
  templateUrl: './character-purse.component.html',
  styleUrls: ['./character-purse.component.sass']
})
export class CharacterPurseComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
