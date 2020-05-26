import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import {DefaultSettingsHelper} from "../../default-settings-helper";
import {Mount} from "../../mount";

@Component({
  selector: 'character-mounts',
  templateUrl: './character-mounts.component.html',
  styleUrls: ['./character-mounts.component.sass']
})
export class CharacterMountsComponent implements OnInit {
  @Input() character: Character;
  editing: number = -1;
  constructor(private gameservice: GameService) { }

  ngOnInit(): void {
  }

  startEditing(index){
    this.editing = index;
  }

  stopEditing(){
    this.editing = -1;
  }

  createMount(){
    if(!this.character.mounts)
      this.character.mounts = [];
    this.character.mounts.push(new Mount(DefaultSettingsHelper.mount()));
  }

  removeMount(mount){
    if(confirm("Are you sure you want to delete " + mount.name + "?")){
      mount.deleted = true;
      this.editing = -1;
    }
  }
}
