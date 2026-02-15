import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../character';
import {GameService} from '../game.service';
import {NewCharacter} from '../new-character';
import {DefaultSettingsHelper} from '../default-settings-helper';
import {MatDialog} from '@angular/material/dialog';
import {GenerateCharacterDialogComponent} from '../generate-character-dialog/generate-character-dialog.component';

@Component({
  selector: 'app-hirelings',
  templateUrl: './hirelings.component.html',
  styleUrls: ['./hirelings.component.sass']
})
export class HirelingsComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.character = this.gameService.getGame().getCharacter()
  }

  importHireling(event){
    if(this.gameService.lock)
      return;
    let file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = function (e) {
      const result: string = reader.result as string
      return this.character.hirelings.push(new Character(JSON.parse(result).character));
    }.bind(this);
    reader.readAsText(file);
  }

  getHirelings(){
    return this.character.hirelings.filter(h=>!h.deleted);
  }

  addHireling() {
    if(this.gameService.lock)
      return;

    this.gameService.getGame().getCharacter().hirelings.push(new Character(DefaultSettingsHelper.character()));
  }

  generateHireling() {
    if(this.gameService.lock)
      return;

    const dialogRef = this.dialog.open(GenerateCharacterDialogComponent, {
      width: '90vw',
      maxWidth: '1000px'
    });
    dialogRef.afterClosed().subscribe((hireling: Character) => {
      if (hireling) {
        this.gameService.getGame().getCharacter().hirelings.push(hireling);
      }
    });
  }

  removeHireling(hireling) {
    if(this.gameService.lock)
      return;
    if(confirm("Are you sure you want to remove " + hireling.name + '?'))
      hireling.deleted = true
  }

  bestLabel(hireling){
    if(hireling.name)
      return `${hireling.name} ${hireling.getConciseClassLevelString()}`;
    else
      return hireling.getConciseClassLevelString();
  }

}
