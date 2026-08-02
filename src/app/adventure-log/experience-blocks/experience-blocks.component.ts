import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {ExperienceBlock} from "../../experience-block";
import {Experience} from "../../experience";
import {GameService} from "../../game.service";
import {MatDialog} from "@angular/material/dialog";
import {CharacterExperienceDialogComponent} from "../../show-character/character-experience/character-experience-dialog/character-experience-dialog.component";
import {Character} from "../../character";
import { MatMiniFabButton, MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SlicePipe, DatePipe } from '@angular/common';
import { MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription } from '@angular/material/expansion';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'adventure-log-experience-blocks',
    templateUrl: './experience-blocks.component.html',
    styleUrls: ['./experience-blocks.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatMiniFabButton, MatButton, MatIconButton, MatIcon, MatAccordion, MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle, MatExpansionPanelDescription, MatFormField, MatLabel, MatInput, MatSelect, MatOption, MatDatepickerInput, FormsModule, MatDatepickerToggle, MatSuffix, MatDatepicker, SlicePipe, DatePipe]
})
export class ExperienceBlocksComponent implements OnInit {
  @Input() character: Character
  editing: number = -1
  classes = Character.classes()
  abilities = Character.abilities()
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

  // Multiclassing: adding a class transfers 1000 XP out of the first block into the new one.
  canAddClass(){
    return this.character.getExperience()[0].currentLevelExperience() - 1000 >= 0
  }

  addExperienceBlock(){
    if(this.gameService.lock)
      return;
    if(!confirm("Are you sure you want to Multiclass? This will take 1000 experience from your initial class"))
      return;
    this.character.getExperience()[0].addExperience(new Experience({date: new Date(), points: -1000, notes: 'Multiclassing experience transfer'}))
    this.character.experience.push(new ExperienceBlock({class: 'Fighter'}))
    this.editing = this.character.getExperience().length - 1
    this.character.initializeExperienceBonus()
  }

  doneEditing(){
    this.editing = -1
    this.character.initializeExperienceBonus()
    this.character.initializeInitialSpells()
  }

  confirmDelete(block: ExperienceBlock){
    if(this.gameService.lock)
      return;
    if(confirm("Are you sure you want to delete this block and all of the experience?")){
      block.delete()
      this.character.initializeExperienceBonus()
    }
  }

}
