import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowCharacterComponent} from "./show-character/show-character.component";
import {NotesComponent} from "./notes/notes.component";


const routes: Routes = [
  {path: '', redirectTo: 'character', pathMatch: "full"},
  {path: 'character', component: ShowCharacterComponent},
  {path: 'notes', component: NotesComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
