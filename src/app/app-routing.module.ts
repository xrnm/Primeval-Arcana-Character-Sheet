import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShowCharacterComponent} from "./show-character/show-character.component";
import { AdventureLogComponent } from "./adventure-log/adventure-log.component";
import {HomeComponent} from "./home/home.component";
import {RawEditComponent} from "./raw-edit/raw-edit.component";
import {CampaignsComponent} from "./campaigns/campaigns.component";
import {CampaignComponent} from "./campaign/campaign.component";
import {CharacterExperiencePageComponent} from "./character-experience-page/character-experience-page.component";
import {SummaryComponent} from "./summary/summary.component";
import {accountGuard} from "./auth/account.guard";


const routes: Routes = [
  {path: '', component: CampaignsComponent, canMatch: [accountGuard]},
  {path: '', component: HomeComponent},
  {path: 'campaign/:id', component: CampaignComponent, canMatch: [accountGuard]},
  {path: 'character', component: ShowCharacterComponent},
  {path: 'c/:slug', component: ShowCharacterComponent},
  {path: 'experience/:slug', component: CharacterExperiencePageComponent},
  {path: 'summary', component: SummaryComponent},
  {path: 'adventure-log', component: AdventureLogComponent},
  {path: 'raw-edit', component: RawEditComponent}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
