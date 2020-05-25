import { Component, OnInit, Input } from '@angular/core';
import {Item} from "../../../item";
import {MatDialog} from "@angular/material/dialog";
import {ItemDialogComponent} from "../item-dialog/item-dialog.component";
import {GameService} from "../../../game.service";

@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
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
