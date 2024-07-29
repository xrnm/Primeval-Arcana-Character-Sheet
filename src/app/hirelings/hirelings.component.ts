import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../character";
import {GameService} from "../game.service";
import {NewCharacter} from "../new-character";
import {DefaultSettingsHelper} from "../default-settings-helper";

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

  importHireling(event){
    if(this.gameService.lock)
      return;
    let file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = function (e) {
      const result: string = reader.result as string
      return this.character.hirelings.push(new Character(JSON.parse(result).character));
    }.bind(this);
    reader.readAsText(file);
  }

  getHirelings(){
    return this.character.hirelings.filter(h=>!h.deleted);
  }

  addHireling() {
    if(this.gameService.lock)
      return;

    this.gameService.getGame().getCharacter().hirelings.push(new Character(DefaultSettingsHelper.character()));
  }

  removeHireling(hireling) {
    if(this.gameService.lock)
      return;
    if(confirm("Are you sure you want to remove " + hireling.name + '?'))
      hireling.deleted = true
  }

  bestLabel(hireling){
    if(hireling.name)
      return `${hireling.name} ${hireling.getConciseClassLevelString()}`;
    else
      return hireling.getConciseClassLevelString();
  }

}
