import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatMenu, MatMenuItem, MatMenuTrigger, MatMenuContent} from '@angular/material/menu';
import {MatSlideToggle} from '@angular/material/slide-toggle';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {GameService} from '../game.service';
import {CampaignService} from '../campaign.service';
import {Title} from '@angular/platform-browser';
import {Game} from '../game';
import {Campaign} from '../campaign';
import {Character} from '../character';
import {Note} from '../note';
import {CharacterSummary} from '../persistence/character-summary';
import {CampaignSummary} from '../persistence/campaign-summary';
import {AppModeHelper} from '../app-mode-helper';
import {GenerateCharacterDialogComponent} from '../generate-character-dialog/generate-character-dialog.component';

const LOCAL_KEY = 'odnd-character';
const CLAIMED_KEY = 'odnd-character-claimed';

@Component({
    selector: 'app-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.sass'],
    imports: [RouterLink, MatButton, MatIconButton, MatIcon, MatMenu, MatMenuItem, MatMenuTrigger, MatMenuContent, MatSlideToggle, MatFormField, MatLabel, MatInput, FormsModule]
})
export class CampaignComponent implements OnInit {
  campaign: Campaign | null = null;
  characters: CharacterSummary[] = [];
  campaigns: CampaignSummary[] = [];
  showDead: boolean = false;
  claimable: Game | null = null;
  editingName: boolean = false;
  private cid: string = '';

  constructor(private gameService: GameService, private campaignService: CampaignService,
              private route: ActivatedRoute, private router: Router, private dialog: MatDialog, private title: Title) {}

  async ngOnInit(): Promise<void> {
    this.cid = this.route.snapshot.paramMap.get('id') || '';
    this.campaign = await this.campaignService.load(this.cid);
    if (!this.campaign) {
      this.router.navigate(['']);
      return;
    }
    this.campaignService.setActive(this.campaign);
    this.title.setTitle(this.campaign.name);
    this.campaigns = await this.campaignService.list();
    await this.refreshCharacters();
    this.checkClaimable();
  }

  async refreshCharacters(): Promise<void> {
    this.characters = await this.gameService.getRepository().listByCampaign(this.cid);
  }

  // Campaigns a character could be moved to (everything except the one we're viewing).
  otherCampaigns(): CampaignSummary[] {
    return this.campaigns.filter(c => c.id !== this.cid);
  }

  async moveCharacter(summary: CharacterSummary, campaignId: string): Promise<void> {
    await this.gameService.getRepository().setCampaign(summary.id, campaignId);
    await this.refreshCharacters();
  }

  visible(): CharacterSummary[] {
    return this.characters.filter(c => this.showDead || c.status !== 'dead');
  }

  // Readable URL slug for an existing character; falls back to the id (e.g. unnamed characters).
  link(summary: CharacterSummary): string {
    return AppModeHelper.slug(summary.name) || summary.id;
  }

  async newCharacter(): Promise<void> {
    await this.gameService.createAndOpen(this.gameService.buildNewGame(), this.cid);
    this.goToActiveCharacter();
  }

  async addHireling(): Promise<void> {
    const game = this.gameService.buildNewGame();
    game.hireling = true;
    await this.gameService.createAndOpen(game, this.cid);
    this.goToActiveCharacter();
  }

  generate(): void {
    const dialogRef = this.dialog.open(GenerateCharacterDialogComponent, {
      width: '90vw',
      maxWidth: '1000px'
    });
    dialogRef.afterClosed().subscribe(async (character: Character) => {
      if (!character)
        return;
      const game = this.gameService.buildNewGame();
      game.character = character;
      await this.gameService.createAndOpen(game, this.cid);
      this.goToActiveCharacter();
    });
  }

  importFile(event): void {
    const file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = async () => {
      const game = new Game(JSON.parse(reader.result as string));
      await this.gameService.createAndOpen(game, this.cid);
      this.goToActiveCharacter();
    };
    reader.readAsText(file);
  }

  private goToActiveCharacter(): void {
    const game = this.gameService.getGame();
    this.router.navigate(['/c', AppModeHelper.slug(game.character.name) || game.id]);
  }

  async toggleStatus(summary: CharacterSummary): Promise<void> {
    const game = await this.gameService.getRepository().load(summary.id);
    if (!game)
      return;
    game.status = game.status === 'dead' ? 'alive' : 'dead';
    await this.gameService.getRepository().save(game);
    summary.status = game.status;
  }

  async remove(summary: CharacterSummary): Promise<void> {
    if (!confirm(`Delete ${summary.name}? This cannot be undone.`))
      return;
    await this.gameService.getRepository().delete(summary.id);
    await this.refreshCharacters();
  }

  async deleteCampaign(): Promise<void> {
    if (!this.campaign)
      return;
    if (!confirm(`Delete campaign "${this.campaign.name}" and unlink its characters? This cannot be undone.`))
      return;
    await this.campaignService.delete(this.cid);
    this.router.navigate(['']);
  }

  private checkClaimable(): void {
    const raw = localStorage.getItem(LOCAL_KEY);
    if (!raw)
      return;
    const local = new Game(JSON.parse(raw));
    if (localStorage.getItem(CLAIMED_KEY) !== local.id)
      this.claimable = local;
  }

  async claim(): Promise<void> {
    if (!this.claimable || !this.campaign)
      return;
    const localId = this.claimable.id;
    const origin = this.claimable.getCharacter().name || 'Unknown';
    // Move the character's personal log into the shared campaign log (notes tagged with their
    // origin character) so nothing is lost or duplicated.
    this.campaign.sessions.push(...this.claimable.sessions);
    this.campaign.notes.push(...this.claimable.notes.map(n => new Note({name: n.name, content: n.content, source: n.source || origin})));
    await this.campaignService.save(this.campaign);
    this.claimable.sessions = [];
    this.claimable.notes = [];
    await this.gameService.getRepository().create(this.claimable, this.cid);
    localStorage.setItem(CLAIMED_KEY, localId);
    this.claimable = null;
    await this.refreshCharacters();
  }

  dismissClaim(): void {
    this.claimable = null;
  }
}
