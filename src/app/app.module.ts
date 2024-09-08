import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular/material/legacy-tooltip';
import { MatLegacyCardModule as MatCardModule} from "@angular/material/legacy-card";
import { MatExpansionModule} from "@angular/material/expansion";
import { ShowCharacterComponent } from './show-character/show-character.component';
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import { MatGridListModule} from "@angular/material/grid-list";
import { CharacterOverviewComponent } from './show-character/character-overview/character-overview.component';
import { CharacterAttributesComponent } from './show-character/character-attributes/character-attributes.component';
import { CharacterInventoryComponent } from './show-character/character-inventory/character-inventory.component';
import { CharacterExperienceComponent } from './show-character/character-experience/character-experience.component';
import { CharacterPurseComponent } from './show-character/character-purse/character-purse.component';
import { CharacterNotesComponent } from './show-character/character-notes/character-notes.component';
import { AdventureLogComponent } from './adventure-log/adventure-log.component';
import { NotesComponent } from './adventure-log/notes/notes.component';
import { MatLegacyProgressBarModule as MatProgressBarModule} from "@angular/material/legacy-progress-bar";
import { MatIconModule} from "@angular/material/icon";
import { MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import { SessionsComponent } from './adventure-log/sessions/sessions.component';
import { MatNativeDateModule} from "@angular/material/core";
import { MatDatepickerModule} from "@angular/material/datepicker";
import { MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import { MatLegacyAutocompleteModule as MatAutocompleteModule} from "@angular/material/legacy-autocomplete";
import { MatLegacyCheckboxModule as MatCheckboxModule} from "@angular/material/legacy-checkbox";
import { MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import { HomeComponent } from './home/home.component';
import { CharacterExperienceDialogComponent } from './show-character/character-experience/character-experience-dialog/character-experience-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatLegacyTableModule as MatTableModule} from '@angular/material/legacy-table';
import { ExperienceBlocksComponent } from './adventure-log/experience-blocks/experience-blocks.component';
import { ReversePipe } from './reverse.pipe';
import { ItemComponent } from './show-character/item-list/item/item.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import { ItemListComponent } from './show-character/item-list/item-list.component';
import { ItemDialogComponent } from './show-character/item-list/item-dialog/item-dialog.component';
import { ContainerDialogComponent } from './show-character/character-inventory/container-dialog/container-dialog.component';
import { RawEditComponent } from './raw-edit/raw-edit.component';
import { CharacterSpellBookComponent } from './show-character/character-spell-book/character-spell-book.component';
import {MatLegacyTabsModule as MatTabsModule} from "@angular/material/legacy-tabs";
import { CharacterSpellSlotsComponent } from './show-character/character-spell-book/character-spell-slots/character-spell-slots.component';
import { SpellDialogComponent } from './show-character/character-spell-book/spell-dialog/spell-dialog.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import { LinksComponent } from './links/links.component';
import { HirelingsComponent } from './hirelings/hirelings.component';
import { CharacterMountsComponent } from './show-character/character-mounts/character-mounts.component';
import { CharacterClericComponent } from './show-character/character-cleric/character-cleric.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowCharacterComponent,
    CharacterOverviewComponent,
    CharacterAttributesComponent,
    CharacterInventoryComponent,
    CharacterExperienceComponent,
    CharacterExperienceDialogComponent,
    CharacterPurseComponent,
    CharacterNotesComponent,
    AdventureLogComponent,
    NotesComponent,
    SessionsComponent,
    HomeComponent,
    ExperienceBlocksComponent,
    ReversePipe,
    ItemComponent,
    ItemListComponent,
    ItemDialogComponent,
    ContainerDialogComponent,
    RawEditComponent,
    CharacterSpellBookComponent,
    CharacterSpellSlotsComponent,
    SpellDialogComponent,
    LinksComponent,
    HirelingsComponent,
    CharacterMountsComponent,
    CharacterClericComponent
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
    FormsModule,
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    DragDropModule,
    MatTooltipModule,
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [
    MatNativeDateModule,
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
