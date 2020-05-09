import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../item";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {MatDialog} from "@angular/material/dialog";
import {ItemDialogComponent} from "./item-dialog/item-dialog.component";

@Component({
  selector: 'item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {
  @Input() items: Item[];
  @Input() capacity: number = 500;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<Item[]>){
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
    const dialogRef = this.dialog.open(ItemDialogComponent,{
      data: {
        list: list,
        item: item
      }
    });
  }

}
