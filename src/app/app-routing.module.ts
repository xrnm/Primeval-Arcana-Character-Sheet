import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowCharacterComponent} from "./show-character/show-character.component";
import { AdventureLogComponent } from "./adventure-log/adventure-log.component";
import {HomeComponent} from "./home/home.component";
import {RawEditComponent} from "./raw-edit/raw-edit.component";


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'character', component: ShowCharacterComponent},
  {path: 'adventure-log', component: AdventureLogComponent},
  {path: 'raw-edit', component: RawEditComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
