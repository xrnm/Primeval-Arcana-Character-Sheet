import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../item";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {ItemDialogComponent} from "./item-dialog/item-dialog.component";
import {GameService} from "../../game.service";

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];
  @Input() capacity: number = 500;
  constructor(public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Item[]>){
    if(this.gameService.lock)
      return;

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  openItemDialog(item: Item, list: Item[]){
    if(this.gameService.lock)
      return;
    const dialogRef = this.dialog.open(ItemDialogComponent,{
      data: {
        list: list,
        item: item
      }
    });
  }
  getItems(): Item[]{
    return this.items.filter(item => !item.deleted)
  }
}
