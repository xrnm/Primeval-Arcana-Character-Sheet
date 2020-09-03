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
  addExperinceBlock(){
    console.log('fuck');
  }
  confirmDelete(block){
    if(confirm("Are you sure you want to delete this block and all of the experience?"))
      block.delete()
  }
}
