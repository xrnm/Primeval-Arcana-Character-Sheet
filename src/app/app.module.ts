import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule} from "@angular/material/card";
import { MatExpansionModule} from "@angular/material/expansion";
import { ShowCharacterComponent } from './show-character/show-character.component';
import {MatListModule} from "@angular/material/list";
import { MatGridListModule} from "@angular/material/grid-list";
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { CharacterOverviewComponent } from './show-character/character-overview/character-overview.component';
import { CharacterAttributesComponent } from './show-character/character-attributes/character-attributes.component';
import { CharacterInventoryComponent } from './show-character/character-inventory/character-inventory.component';
import { CharacterExperienceComponent } from './show-character/character-experience/character-experience.component';
import { CharacterPurseComponent } from './show-character/character-purse/character-purse.component';
import { CharacterNotesComponent } from './show-character/character-notes/character-notes.component';
import { AdventureLogComponent } from './adventure-log/adventure-log.component';
import { NotesComponent } from './adventure-log/notes/notes.component';
import { CharacterDerivedAttributesComponent } from './show-character/character-derived-attributes/character-derived-attributes.component';


@NgModule({
  declarations: [
    AppComponent,
    ShowCharacterComponent,
    CharacterOverviewComponent,
    CharacterAttributesComponent,
    CharacterInventoryComponent,
    CharacterExperienceComponent,
    CharacterPurseComponent,
    CharacterNotesComponent,
    AdventureLogComponent,
    NotesComponent,
    CharacterDerivedAttributesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
