import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from "@angular/material/toolbar";
import {MatCard, MatCardModule} from "@angular/material/card";
import { ShowCharacterComponent } from './show-character/show-character.component';
import {MatListModule} from "@angular/material/list";
import { MatGridListModule} from "@angular/material/grid-list";
import '@angular/material/prebuilt-themes/deeppurple-amber.css';
import { CharacterOverviewComponent } from './show-character/character-overview/character-overview.component';
import { CharacterAttributesComponent } from './show-character/character-attributes/character-attributes.component';
import { CharacterInventoryComponent } from './show-character/character-inventory/character-inventory.component';
import { CharacterExperienceComponent } from './show-character/character-experience/character-experience.component';

@NgModule({
  declarations: [
    AppComponent,
    ShowCharacterComponent,
    CharacterOverviewComponent,
    CharacterAttributesComponent,
    CharacterInventoryComponent,
    CharacterExperienceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
