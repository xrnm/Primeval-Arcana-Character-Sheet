import { Component, OnInit, Input } from '@angular/core';
import { Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.sass']
})
export class CharacterOverviewComponent implements OnInit {

  constructor(private gameService: GameService) { }
  @Input() character: Character;
  editing: string = null;

  classes = Character.classes();

  editSection(id){
    if(this.gameService.lock)
      return;

    this.editing = id
  }

  doneEditing(){
    if(this.gameService.lock)
      return;
    this.editing = null;
  }
  ngOnInit(): void {
  }

  changeCharacter(attribute: string, delta: number){
    if(this.gameService.lock)
      return;
    this.character[attribute] += delta
  }
}
