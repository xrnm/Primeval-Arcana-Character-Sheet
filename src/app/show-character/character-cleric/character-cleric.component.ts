import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-cleric',
  templateUrl: './character-cleric.component.html',
  styleUrls: ['./character-cleric.component.sass']
})
export class CharacterClericComponent implements OnInit {

  @Input() character: Character;
  editing: string = null;

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }
  editSection(id){
    if(this.gameService.lock)
      return;

    this.editing = id
  }

  changePrayer(delta){
    const newVal = this.character.used_pray_slots + delta
    if(newVal >= 0 && newVal <= this.character.getTotalPrayerSlots())
      this.character.used_pray_slots = newVal
  }
  changeTurning(delta){
    const newVal = this.character.used_turning_slots + delta
    if(newVal >= 0 && newVal <= this.character.getTotalTurningSlots())
      this.character.used_turning_slots = newVal
  }

  doneEditing(){
    if(this.gameService.lock)
      return;
    this.editing = null;
  }

}
