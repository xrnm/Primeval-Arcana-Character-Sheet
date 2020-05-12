import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../character";
import {GameService} from "../game.service";

@Component({
  selector: 'app-hirelings',
  templateUrl: './hirelings.component.html',
  styleUrls: ['./hirelings.component.sass']
})
export class HirelingsComponent implements OnInit {
  @Input() hirelings: Character[];

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.hirelings = this.gameService.getGame().getCharacter().hirelings;
    if(!this.hirelings)
      this.hirelings = [];
  }
  addHireling(){
    this.hirelings.push(new Character());
  }
  removeHireling(hireling){
  this.hirelings= this.hirelings.filter(h=>h!=hireling);
  }

}
