import { Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";

@Component({
  selector: 'character-experience',
  templateUrl: './character-experience.component.html',
  styleUrls: ['./character-experience.component.sass']
})
export class CharacterExperienceComponent implements OnInit {
  @Input() character: Character;
  constructor() { }

  ngOnInit(): void {
  }

}
