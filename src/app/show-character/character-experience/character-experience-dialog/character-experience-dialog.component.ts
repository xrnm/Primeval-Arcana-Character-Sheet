import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from "@angular/material/dialog";
import {ExperienceBlock} from "../../../experience-block";
import {Experience} from "../../../experience";
import {Character} from "../../../character";
import { CdkScrollable } from '@angular/cdk/scrolling';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';

import { MatButton } from '@angular/material/button';


@Component({
    selector: 'app-character-experience-dialog',
    templateUrl: './character-experience-dialog.component.html',
    styleUrls: ['./character-experience-dialog.component.sass'],
    imports: [MatDialogTitle, CdkScrollable, MatDialogContent, MatFormField, MatLabel, MatInput, MatDatepickerInput, FormsModule, MatDatepickerToggle, MatSuffix, MatDatepicker, MatDialogActions, MatButton, MatDialogClose]
})
export class CharacterExperienceDialogComponent implements OnInit {
  character: Character;
  experience: Experience;



  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.character = data.character;
    this.experience = new Experience({points: 0, date: new Date()});
  }

  addExperience(){
    this.character.addExperience(this.experience);
  }


  ngOnInit(): void {
  }

}
