import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import {Beast} from "../../beast";
import {GameService} from "../../game.service";
import {BestiaryImageRepository} from "../../persistence/bestiary-image.repository";
import {BeastDialogComponent} from "./beast-dialog/beast-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardContent } from '@angular/material/card';

@Component({
    selector: 'adventure-log-bestiary',
    templateUrl: './bestiary.component.html',
    styleUrls: ['./bestiary.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatMiniFabButton, MatIcon, MatCard, MatCardContent]
})
export class BestiaryComponent {
  @Input() bestiary: Beast[];

  constructor(private gameService: GameService, private images: BestiaryImageRepository,
              public dialog: MatDialog) { }

  imageUrl(beast: Beast): string {
    return this.images.publicUrl(beast.image_path);
  }

  openBeastDialog(beast: Beast){
    if(this.gameService.lock)
      return;
    this.dialog.open(BeastDialogComponent, {
      width: '80vw',
      maxWidth: '640px',
      data: {
        bestiary: this.bestiary,
        beast: beast
      }
    });
  }
}
