import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../../item";
import {MatDialog} from "@angular/material/dialog";
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";
import {GameService} from "../../../game.service";

import { MatListItem } from '@angular/material/list';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatMiniFabButton } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';

@Component({
    selector: 'item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.sass'],
    imports: [MatListItem, MatTooltip, MatIcon, MatMiniFabButton, MatDivider]
})
export class ItemComponent implements OnInit {
  @Input() item: Item;
  constructor(public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit(): void {
  }
  delete(item){
    if(this.gameService.lock)
      return;
    item.delete();
  }
  consume(item, $event){
    if(this.gameService.lock)
      return;
    item.consume($event)
  }
  collect(item, $event){
    if(this.gameService.lock)
      return;
    item.collect($event)
  }

  openItemDialog(item: Item){
    if(this.gameService.lock)
      return;

    const dialogRef = this.dialog.open(ItemDialogComponent,{
      data: {
        item: item
      }
    });
  }

}
