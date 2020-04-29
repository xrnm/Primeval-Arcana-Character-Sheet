import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowCharacterComponent} from "./show-character/show-character.component";
import { AdventureLogComponent } from "./adventure-log/adventure-log.component";


const routes: Routes = [
  {path: '', redirectTo: 'character', pathMatch: "full"},
  {path: 'character', component: ShowCharacterComponent},
  {path: 'adventure-log', component: AdventureLogComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
