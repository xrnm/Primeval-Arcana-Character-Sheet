import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {CampaignService} from '../campaign.service';
import {Campaign} from '../campaign';
import {CampaignSummary} from '../persistence/campaign-summary';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.sass'],
    imports: [MatButton, MatIconButton, MatIcon, MatFormField, MatLabel, MatInput, FormsModule]
})
export class CampaignsComponent implements OnInit {
  campaigns: CampaignSummary[] = [];
  newName: string = '';

  constructor(private campaignService: CampaignService, private router: Router, private title: Title) {}

  async ngOnInit(): Promise<void> {
    this.title.setTitle('Primeval Arcana Interactive Character Sheet (ICS)');
    await this.refresh();
  }

  async refresh(): Promise<void> {
    this.campaigns = await this.campaignService.list();
  }

  async addCampaign(): Promise<void> {
    const name = this.newName.trim();
    if (!name)
      return;
    const campaign = await this.campaignService.create(new Campaign({name}));
    this.newName = '';
    this.router.navigate(['/campaign', campaign.id]);
  }

  open(campaign: CampaignSummary): void {
    this.router.navigate(['/campaign', campaign.id]);
  }

  async remove(campaign: CampaignSummary): Promise<void> {
    if (!confirm(`Delete campaign "${campaign.name}" and unlink its characters? This cannot be undone.`))
      return;
    await this.campaignService.delete(campaign.id);
    await this.refresh();
  }
}
