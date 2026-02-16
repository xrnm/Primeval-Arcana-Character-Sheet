import { Component, OnInit } from '@angular/core';
import { Character} from "../character";
import {GameService} from "../game.service";
import {Router} from "@angular/router";
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CharacterOverviewComponent } from './character-overview/character-overview.component';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { CharacterClericComponent } from './character-cleric/character-cleric.component';
import { CharacterSpellBookComponent } from './character-spell-book/character-spell-book.component';
import { CharacterExperienceComponent } from './character-experience/character-experience.component';
import { CharacterPurseComponent } from './character-purse/character-purse.component';
import { CharacterInventoryComponent } from './character-inventory/character-inventory.component';
import { CharacterMountsComponent } from './character-mounts/character-mounts.component';
import { CharacterNotesComponent } from './character-notes/character-notes.component';

@Component({
    selector: 'app-show-character',
    templateUrl: './show-character.component.html',
    styleUrls: ['./show-character.component.sass'],
    imports: [CdkDropListGroup, CharacterOverviewComponent, CharacterAttributesComponent, CharacterClericComponent, CharacterSpellBookComponent, CharacterExperienceComponent, CharacterPurseComponent, CharacterInventoryComponent, CharacterMountsComponent, CharacterNotesComponent]
})
export class ShowCharacterComponent implements OnInit {
  character: Character;
  constructor(private gameService: GameService, private router: Router) { }

  ngOnInit(): void {
    if(!this.gameService.getGame())
      this.router.navigate(['']);
    this.character = this.gameService.getGame().getCharacter();
  }

}
