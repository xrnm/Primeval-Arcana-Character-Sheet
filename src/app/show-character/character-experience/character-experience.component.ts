import { Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-experience',
  templateUrl: './character-experience.component.html',
  styleUrls: ['./character-experience.component.sass']
})
export class CharacterExperienceComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
    this.character = this.gameService.getGame().getCharacter();
  }

}
