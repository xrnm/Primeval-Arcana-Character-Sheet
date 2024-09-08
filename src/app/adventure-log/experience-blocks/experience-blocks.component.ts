import { Component, OnInit, Input } from '@angular/core';
import {ExperienceBlock} from "../../experience-block";
import {Experience} from "../../experience";
import {GameService} from "../../game.service";
import {MatLegacyDialog as MatDialog} from "@angular/material/legacy-dialog";
import {CharacterExperienceDialogComponent} from "../../show-character/character-experience/character-experience-dialog/character-experience-dialog.component";
import {Character} from "../../character";

@Component({
  selector: 'adventure-log-experience-blocks',
  templateUrl: './experience-blocks.component.html',
  styleUrls: ['./experience-blocks.component.sass']
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
