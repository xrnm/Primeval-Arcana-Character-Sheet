import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../../item";
import {MatDialog} from "@angular/material/dialog";
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openItemDialog(item: Item){
    const dialogRef = this.dialog.open(ItemDialogComponent,{
      data: {
        item: item
      }
    });
  }

}
