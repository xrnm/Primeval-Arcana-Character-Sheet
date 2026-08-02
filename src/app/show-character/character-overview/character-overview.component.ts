import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Character} from "../../character";
import {GameService} from "../../game.service";
import {AttributeTablesHelper} from "../../attribute-tables-helper";

import { MatCard, MatCardContent } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatList, MatListItem } from '@angular/material/list';
import { MatDivider } from '@angular/material/divider';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatMiniFabButton, MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatChip, MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow, MatChipSet } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { PercentPipe, TitleCasePipe } from '@angular/common';
import { MatAutocomplete, MatAutocompleteTrigger } from '@angular/material/autocomplete';
import { OverflowTooltipDirective } from '../../overflow-tooltip.directive';

@Component({
    selector: 'character-overview',
    templateUrl: './character-overview.component.html',
    styleUrls: ['./character-overview.component.sass'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [MatCard, MatCardContent, MatIcon, MatList, MatListItem, MatDivider, MatFormField, MatLabel, MatInput, MatSelect, MatOption, FormsModule, MatButton, MatTooltip, MatMiniFabButton, MatIconButton, MatCheckbox, MatChipSet, MatChip, MatChipGrid, MatChipRow, MatChipRemove, MatChipInput, MatAutocomplete, MatAutocompleteTrigger, OverflowTooltipDirective, PercentPipe, TitleCasePipe]
})
export class CharacterOverviewComponent implements OnInit {

  constructor(private gameService: GameService) { }
  @Input() character: Character;
  editing: string = null;

  classes = Character.classes();
  handednessOptions = Character.handedness();
  weightClasses = Character.weightClasses();
  dentalOptions = [...new Set(AttributeTablesHelper.DENTAL_STATUSES)];
  languageSeparators = [ENTER, COMMA];
  identifyingQualityOptions = AttributeTablesHelper.IDENTIFYING_QUALITIES;
  filteredIdentifyingQualities = AttributeTablesHelper.IDENTIFYING_QUALITIES;

  editSection(id){
    if(this.gameService.lock)
      return;

    this.editing = id
  }

  doneEditing(){
    if(this.gameService.lock)
      return;
    if(this.editing == 'stats')
      this.gameService.updateTitle();
    this.editing = null;
  }
  ngOnInit(): void {
  }

  filterIdentifyingQualities(){
    const filter = (this.character.identifying_quality || '').toLowerCase();
    this.filteredIdentifyingQualities = this.identifyingQualityOptions.filter(quality => quality.toLowerCase().includes(filter));
  }

  professionTooltip(): string {
    const description = AttributeTablesHelper.PROFESSION_DEFINITIONS[this.character.profession];
    return description ? this.character.profession + ': ' + description : '';
  }

  addLanguage(event: MatChipInputEvent){
    const language = event.value.trim();
    if (language && !this.character.known_languages.includes(language))
      this.character.known_languages.push(language);
    event.chipInput.clear();
  }

  removeLanguage(index: number){
    this.character.known_languages.splice(index, 1);
  }

  changeCharacter(attribute: string, delta: number){
    if(this.gameService.lock)
      return;
    this.character[attribute] += delta
  }
}
