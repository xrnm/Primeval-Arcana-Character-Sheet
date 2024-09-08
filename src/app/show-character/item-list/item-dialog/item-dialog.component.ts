import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Item} from "../../../item";

@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.sass']
})
export class ItemDialogComponent implements OnInit {
  list: Item[];
  item: Item;
  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.list = data.list;
    if(!data.item)
      this.item = new Item();
    else
      this.item = data.item;
  }

  ngOnInit(): void {
  }

  upsertItem(){
    if(this.list)
      this.list.push(this.item);
  }

}
