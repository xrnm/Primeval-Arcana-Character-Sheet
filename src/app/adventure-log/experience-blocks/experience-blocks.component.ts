import { Component, OnInit, Input } from '@angular/core';
import {ExperienceBlock} from "../../experience-block";
import {Experience} from "../../experience";
import {GameService} from "../../game.service";
import {MatDialog} from "@angular/material/dialog";
import {CharacterExperienceDialogComponent} from "../../show-character/character-experience/character-experience-dialog/character-experience-dialog.component";
import {Character} from "../../character";
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SlicePipe, DatePipe } from '@angular/common';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'adventure-log-experience-blocks',
    templateUrl: './experience-blocks.component.html',
    styleUrls: ['./experience-blocks.component.sass'],
    imports: [MatMiniFabButton, MatIcon, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatFormField, MatLabel, MatInput, MatDatepickerInput, FormsModule, MatDatepickerToggle, MatSuffix, MatDatepicker, SlicePipe, DatePipe]
})
export class ExperienceBlocksComponent implements OnInit {
  @Input() character: Character
  constructor(public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit(): void {
  }

  deleteExperience(experience: Experience, block: ExperienceBlock){
    if(this.gameService.lock)
      return;
    block.removeExperience(experience)
  }

  openDialog(){
    if(this.gameService.lock)
      return;

    const dialogRef = this.dialog.open(CharacterExperienceDialogComponent,{
      data: {
        character: this.character
      }
    });
  }

}
