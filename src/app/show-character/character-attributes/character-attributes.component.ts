import { Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";

@Component({
  selector: 'character-attributes',
  templateUrl: './character-attributes.component.html',
  styleUrls: ['./character-attributes.component.sass']
})
export class CharacterAttributesComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
