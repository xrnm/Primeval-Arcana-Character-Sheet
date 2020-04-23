import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowCharacterComponent} from "./show-character/show-character.component";


const routes: Routes = [{path: '', component: ShowCharacterComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
