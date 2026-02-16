import {Component, Input, OnInit} from '@angular/core';
import {Character} from '../character';
import {GameService} from '../game.service';
import {NewCharacter} from '../new-character';
import {DefaultSettingsHelper} from '../default-settings-helper';
import {MatDialog} from '@angular/material/dialog';
import {GenerateCharacterDialogComponent} from '../generate-character-dialog/generate-character-dialog.component';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTabGroup, MatTab } from '@angular/material/tabs';

import { CharacterOverviewComponent } from '../show-character/character-overview/character-overview.component';
import { CharacterAttributesComponent } from '../show-character/character-attributes/character-attributes.component';
import { CharacterSpellBookComponent } from '../show-character/character-spell-book/character-spell-book.component';
import { CharacterExperienceComponent } from '../show-character/character-experience/character-experience.component';
import { CharacterPurseComponent } from '../show-character/character-purse/character-purse.component';
import { CharacterInventoryComponent } from '../show-character/character-inventory/character-inventory.component';
import { ExperienceBlocksComponent } from '../adventure-log/experience-blocks/experience-blocks.component';
import { CharacterNotesComponent } from '../show-character/character-notes/character-notes.component';

@Component({
    selector: 'app-hirelings',
    templateUrl: './hirelings.component.html',
    styleUrls: ['./hirelings.component.sass'],
    imports: [MatMiniFabButton, MatIcon, MatTabGroup, MatTab, CharacterOverviewComponent, CharacterAttributesComponent, CharacterSpellBookComponent, CharacterExperienceComponent, CharacterPurseComponent, CharacterInventoryComponent, ExperienceBlocksComponent, CharacterNotesComponent]
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
