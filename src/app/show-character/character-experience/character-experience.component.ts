import { Component, OnInit, Input} from '@angular/core';
import {Character} from "../../character";
import {GameService} from "../../game.service";
import {MatDialog} from "@angular/material/dialog";
import {CharacterExperienceDialogComponent} from "./character-experience-dialog/character-experience-dialog.component";
import {ExperienceBlock} from "../../experience-block";


@Component({
  selector: 'character-experience',
  templateUrl: './character-experience.component.html',
  styleUrls: ['./character-experience.component.sass']
})
export class CharacterExperienceComponent implements OnInit {
  @Input() character: Character;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(experiences: ExperienceBlock){
    const dialogRef = this.dialog.open(CharacterExperienceDialogComponent,{
      data: {
        experiences: experiences
      }
    });
  }
}
