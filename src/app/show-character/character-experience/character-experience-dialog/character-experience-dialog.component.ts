import {Component, Inject, OnInit} from '@angular/core';
import {MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA} from "@angular/material/legacy-dialog";
import {ExperienceBlock} from "../../../experience-block";
import {Experience} from "../../../experience";
import {Character} from "../../../character";


@Component({
  selector: 'app-character-experience-dialog',
  templateUrl: './character-experience-dialog.component.html',
  styleUrls: ['./character-experience-dialog.component.sass']
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
