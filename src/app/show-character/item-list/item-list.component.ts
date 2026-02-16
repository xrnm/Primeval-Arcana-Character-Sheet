import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../item";
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList, CdkDrag } from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {ItemDialogComponent} from "./item-dialog/item-dialog.component";
import {GameService} from "../../game.service";
import { MatList } from '@angular/material/list';

import { ItemComponent } from './item/item.component';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'item-list',
    templateUrl: './item-list.component.html',
    styleUrls: ['./item-list.component.sass'],
    imports: [MatList, CdkDropList, ItemComponent, CdkDrag, MatMiniFabButton, MatIcon]
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
