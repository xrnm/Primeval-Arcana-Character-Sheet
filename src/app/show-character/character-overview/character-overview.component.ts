import { Component, OnInit, Inject } from '@angular/core';
import { Character} from "../../character";

@Component({
  selector: 'character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.sass']
})
export class CharacterOverviewComponent implements OnInit {

  constructor() { }
  character: Character;

  ngOnInit(): void {
  }

}
