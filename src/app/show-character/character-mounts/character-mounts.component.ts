import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import {DefaultSettingsHelper} from "../../default-settings-helper";
import {Mount} from "../../mount";
import {Container} from "../../container";
import {ContainerDialogComponent} from "../character-inventory/container-dialog/container-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'character-mounts',
  templateUrl: './character-mounts.component.html',
  styleUrls: ['./character-mounts.component.sass']
})
export class CharacterMountsComponent implements OnInit {
  @Input() character: Character;
  editing: number = -1;
  constructor(public dialog: MatDialog, private gameService: GameService) { }

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
  openContainerDialog(container: Container = null, mount: Mount){
    if(this.gameService.lock)
      return;

    let slung_items = null;
    if(!container){
      slung_items = mount.slung_items;
      container = new Container({name: 'New Container', contents: [], slots: 10, weight: 0})
    }

    this.dialog.open(ContainerDialogComponent,{
      data: {
        container: container,
        slung_items: slung_items
      }
    });
  }

  deleteSlungItem(slung_item){
    if(this.gameService.lock)
      return;
    slung_item.delete();
  }

}
