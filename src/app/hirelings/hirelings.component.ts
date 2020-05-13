import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../character";
import {GameService} from "../game.service";
import {NEW_CHARACTER} from "../new-character";

@Component({
  selector: 'app-hirelings',
  templateUrl: './hirelings.component.html',
  styleUrls: ['./hirelings.component.sass']
})
export class HirelingsComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.character = this.gameService.getGame().getCharacter()
  }

  getHirelings(){
    return this.character.hirelings.filter(h=>!h.deleted);
  }

  addHireling() {
    if(this.gameService.lock)
      return;

    this.gameService.getGame().getCharacter().hirelings.push(new Character(NEW_CHARACTER));
  }

  removeHireling(hireling) {
    if(this.gameService.lock)
      return;
    hireling.deleted = true
  }

  bestLabel(hireling){
    if(hireling.name)
      return `${hireling.name} (${hireling.getLevel()}${hireling.getClassAbbreviation()})`;
    else
      return `${hireling.getLevel()}${hireling.getClassAbbreviation()}`;
  }

}
