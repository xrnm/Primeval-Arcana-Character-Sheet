import { Component, OnInit } from '@angular/core';
import { Character} from "../character";
import {GameService} from "../game.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-show-character',
  templateUrl: './show-character.component.html',
  styleUrls: ['./show-character.component.sass']
})
export class ShowCharacterComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    if(!this.gameService.getGame())
      this.router.navigate(['']);
    this.character = this.gameService.getGame().getCharacter();
  }

}
