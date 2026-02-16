import {Component, Input, OnInit} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import {DefaultSettingsHelper} from "../../default-settings-helper";
import {Mount} from "../../mount";
import {Container} from "../../container";
import {ContainerDialogComponent} from "../character-inventory/container-dialog/container-dialog.component";
import {MatDialog} from "@angular/material/dialog";

import { MatDivider } from '@angular/material/divider';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListSubheaderCssMatStyler, MatListItem } from '@angular/material/list';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
    selector: 'character-mounts',
    templateUrl: './character-mounts.component.html',
    styleUrls: ['./character-mounts.component.sass'],
    imports: [MatDivider, MatCard, MatCardContent, MatIcon, MatList, MatListSubheaderCssMatStyler, MatListItem, MatMiniFabButton, MatFormField, MatLabel, MatInput, FormsModule, MatCheckbox, MatButton, ItemListComponent]
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
