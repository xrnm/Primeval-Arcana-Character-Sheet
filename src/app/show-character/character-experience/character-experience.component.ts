import { Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import {MatDialog} from "@angular/material/dialog";
import {CharacterExperienceDialogComponent} from "./character-experience-dialog/character-experience-dialog.component";
import {ExperienceBlock} from "../../experience-block";
import {Experience} from "../../experience";
import { RouterLink } from '@angular/router';
import { MatMiniFabButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { PercentPipe, TitleCasePipe } from '@angular/common';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';


@Component({
    selector: 'character-experience',
    templateUrl: './character-experience.component.html',
    styleUrls: ['./character-experience.component.sass'],
    imports: [RouterLink, MatMiniFabButton, MatIcon, MatCard, MatCardContent, MatList, MatListItem, MatDivider, MatProgressBar, MatFormField, MatLabel, MatSelect, FormsModule, MatOption, MatButton, PercentPipe, TitleCasePipe]
})
export class CharacterExperienceComponent implements OnInit {
  @Input() character: Character;
  editing: number = -1
  classes = Character.classes()
  abilities = Character.abilities()
  constructor(public dialog: MatDialog, private gameService: GameService) { }

  ngOnInit(): void {
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
  addExperienceBlock(){
    if(!confirm("Are you sure you want to Multiclass? This will take 1000 experience from your initial class"))
      return
    this.character.getExperience()[0].addExperience(new Experience({date: new Date(), points: -1000, notes: 'Multiclassing experience transfer'}))
    this.character.experience.push(new ExperienceBlock({class:'Fighter'}))
    this.editing = this.character.getExperience().length -1
    this.character.initializeExperienceBonus()
  }

  canAddClass(){
    return this.character.getExperience()[0].currentLevelExperience() - 1000 >= 0
  }

  doneEditing(){
    this.editing = -1;
    this.character.initializeExperienceBonus()
    this.character.initializeInitialSpells();
  }
  confirmDelete(block){
    if(confirm("Are you sure you want to delete this block and all of the experience?")){
      block.delete()
      this.character.initializeExperienceBonus()
    }
  }
}
