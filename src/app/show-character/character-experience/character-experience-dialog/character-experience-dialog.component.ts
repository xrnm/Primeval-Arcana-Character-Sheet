import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ExperienceBlock} from "../../../experience-block";
import {Experience} from "../../../experience";


@Component({
  selector: 'app-character-experience-dialog',
  templateUrl: './character-experience-dialog.component.html',
  styleUrls: ['./character-experience-dialog.component.sass']
})
export class CharacterExperienceDialogComponent implements OnInit {
  block: ExperienceBlock;
  experience: Experience;



  constructor(@Inject(MAT_DIALOG_DATA) public data) {
    this.block = data.experiences;
    this.experience = new Experience({points: 0, date: new Date()});
  }

  addExperience(){
    this.block.experiences.unshift(this.experience);
  }

  ngOnInit(): void {
  }

}
