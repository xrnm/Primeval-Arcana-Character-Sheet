import {Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import {MatDialog} from "@angular/material/dialog";
import {ContainerDialogComponent} from "./container-dialog/container-dialog.component";
import {Container} from "../../container";

@Component({
  selector: 'character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.sass']
})
export class CharacterInventoryComponent implements OnInit {
  character: Character;

  constructor(private gameService: GameService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.character = this.gameService.getGame().getCharacter();
  }

  openContainerDialog(container: Container = null){
    let slung_items = null;
    if(!container){
      slung_items = this.character.slung_items;
      container = new Container({name: 'New Container', contents: [], slots: 10, weight: 0})
    }
    const dialogRef = this.dialog.open(ContainerDialogComponent,{
      data: {
        container: container,
        slung_items: slung_items
      }
    });
  }

  deleteSlungItem(slung_item){
    slung_item.delete();
  }
}
