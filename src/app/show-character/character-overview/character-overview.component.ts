import { Component, OnInit, Input } from '@angular/core';
import { Character} from "../../character";
import {GameService} from "../../game.service";

@Component({
  selector: 'character-overview',
  templateUrl: './character-overview.component.html',
  styleUrls: ['./character-overview.component.sass']
})
export class CharacterOverviewComponent implements OnInit {

  constructor() { }
  @Input() character: Character;
  editing: string = null;

  classes = Character.classes();

  editSection(id){
    this.editing = id
  }

  doneEditing(){
    this.editing = null;
  }
  ngOnInit(): void {
  }

  changeCharacter(attribute: string, delta: number){
    this.character[attribute] += delta
  }
}
