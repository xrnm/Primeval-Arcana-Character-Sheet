import {Component, OnInit, OnDestroy} from '@angular/core';
import {GameService} from '../game.service';
import {CampaignService} from '../campaign.service';
import {AuthService} from '../auth/auth.service';
import {Character} from '../character';

@Component({
    selector: 'app-summary',
    templateUrl: './summary.component.html',
    styleUrls: ['./summary.component.sass'],
    imports: []
})
export class SummaryComponent implements OnInit, OnDestroy {
  characters: Character[] = [];
  private timer?: number;

  constructor(private gameService: GameService, private campaignService: CampaignService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    await this.authService.ready();
    await this.campaignService.restoreActive();
    await this.load();
    // Poll so the glanceable stats (HP, load, etc.) stay current while the main tab is edited.
    this.timer = window.setInterval(() => this.load(), 15000);
  }

  ngOnDestroy(): void {
    if (this.timer)
      clearInterval(this.timer);
  }

  private async load(): Promise<void> {
    const campaign = this.campaignService.activeCampaign;
    if (campaign) {
      const summaries = await this.gameService.getRepository().listByCampaign(campaign.id);
      const ids = summaries.filter(s => s.status !== 'dead').map(s => s.id);
      const games = await Promise.all(ids.map(id => this.gameService.getRepository().load(id)));
      this.characters = games.filter(Boolean).map(game => game.getCharacter());
    } else {
      const game = this.gameService.getGame();
      this.characters = game ? [game.getCharacter()] : [];
    }
  }
}
