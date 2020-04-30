import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";

@Component({
  selector: 'character-derived-attributes',
  templateUrl: './character-derived-attributes.component.html',
  styleUrls: ['./character-derived-attributes.component.sass']
})
export class CharacterDerivedAttributesComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
