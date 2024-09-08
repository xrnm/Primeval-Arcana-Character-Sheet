import {Component, Inject, Input, OnInit} from '@angular/core';
import {Container} from "../../../container";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-container-dialog',
  templateUrl: './container-dialog.component.html',
  styleUrls: ['./container-dialog.component.sass']
})
export class ContainerDialogComponent implements OnInit {
  container: Container;
  slung_items: Container[];

  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.container = data.container;
    this.slung_items = data.slung_items;
  }

  ngOnInit(): void {
  }

  upsertContainer(){
    if(this.slung_items)
      this.slung_items.push(this.container);
  }
}
