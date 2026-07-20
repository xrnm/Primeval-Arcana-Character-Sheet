import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GameService} from "./game.service";
import {saveAs} from 'file-saver'
import { Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatSidenavContainer, MatSidenav, MatSidenavContent } from '@angular/material/sidenav';
import { LinksComponent } from './links/links.component';
import { MatButton, MatIconButton, MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { AuthService } from './auth/auth.service';
import { AuthDialogComponent } from './auth/auth-dialog.component';
import { SetPasswordDialogComponent } from './auth/set-password-dialog.component';
import { CampaignService } from './campaign.service';
import { CharacterSummary } from './persistence/character-summary';
import { AppModeHelper } from './app-mode-helper';

// Original battle-helm icon (barbute style: domed top, T-shaped visor) — inspired by the
// "battle helmet" look, drawn from scratch (not copied from any icon set). Uses currentColor.
const HELM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M12 2C7.58 2 5 5.36 5 9.5V14c0 3.87 3.13 7 7 7s7-3.13 7-7V9.5C19 5.36 16.42 2 12 2ZM7.5 9h9v2h-9zM11 11h2v6h-2zM8.15 13a.55 .55 0 1 0 1.1 0 .55 .55 0 1 0-1.1 0zM8.15 15.2a.55 .55 0 1 0 1.1 0 .55 .55 0 1 0-1.1 0zM14.75 13a.55 .55 0 1 0 1.1 0 .55 .55 0 1 0-1.1 0zM14.75 15.2a.55 .55 0 1 0 1.1 0 .55 .55 0 1 0-1.1 0z"/></svg>`;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass'],
    imports: [MatSidenavContainer, MatSidenav, LinksComponent, MatButton, MatIcon, MatIconButton, RouterLink, MatSidenavContent, MatToolbar, RouterOutlet, MatMiniFabButton, MatMenu, MatMenuItem, MatMenuTrigger]
})
export class AppComponent {
  year = new Date().getFullYear();
  opened = false;
  canonical = AppModeHelper.isCanonicalOrigin();
  characters: CharacterSummary[] = [];
  authReady = false;
  accountsBannerDismissed = localStorage.getItem('odnd-accounts-banner-dismissed') === '1';

  constructor(private titleService: Title, private router: Router, public gameService: GameService,
              public authService: AuthService, public campaignService: CampaignService, private dialog: MatDialog,
              iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIconLiteral('helm', sanitizer.bypassSecurityTrustHtml(HELM_SVG));
  }

  async ngOnInit(){
    // A password-recovery email link brings the user back here; prompt for a new password.
    this.authService.recovery$.subscribe(() => this.completeRecovery());
    // Gate the accounts banner on a resolved session so it never flashes for logged-in users.
    this.authService.ready().then(() => this.authReady = true);

    if (AppModeHelper.isLegacySubdomain()) {
      await this.startSubdomain();
      return;
    }

    await this.authService.ready();
    // On the canonical origin an authenticated user gets the roster at '' (guarded) or a /c/:slug
    // deep link; the router handles both, so we don't auto-load a character here.
    if (this.authService.isAuthenticated()) {
      await this.campaignService.restoreActive();
      // One-time background sweep to migrate every character's legacy nested hirelings.
      this.gameService.migrateAllHirelings();
      // First sign-in with a local character: auto-create a campaign, install it, and land there.
      const converted = await this.gameService.autoConvertLocalCharacter();
      if (converted)
        this.router.navigate(['/c', AppModeHelper.slug(converted.character.name) || converted.id]);
      return;
    }

    this.loadLocalAndOpen();
  }

  // The character stat HUD (and the space the nav/footer reserve for it) only belongs on a
  // character page — not on the account-level campaign list / campaign pages.
  showHud(): boolean {
    if (!this.gameService.getGame())
      return false;
    const url = this.router.url;
    return url !== '/' && !url.startsWith('/campaign') && !this.bareLayout();
  }

  // The pop-out summary window renders chrome-free (no nav/footer/HUD).
  bareLayout(): boolean {
    return this.router.url.startsWith('/summary');
  }

  popOutSummary(){
    window.open('/summary', 'ics-summary', 'width=480,height=560,menubar=no,toolbar=no,location=no');
  }

  // Nudge anonymous users about accounts, once — dismissal is remembered in localStorage.
  // Not shown to users who already have an account (Home prompts sign-in instead).
  showAccountsBanner(): boolean {
    return this.authReady && !this.authService.isAuthenticated() && !this.accountsBannerDismissed
      && !this.bareLayout() && !localStorage.getItem('odnd-has-account');
  }

  dismissAccountsBanner(){
    this.accountsBannerDismissed = true;
    localStorage.setItem('odnd-accounts-banner-dismissed', '1');
  }

  // Character switcher — scoped to the active campaign; loaded fresh each time the menu opens.
  async loadCharacters(){
    const campaign = this.campaignService.activeCampaign;
    this.characters = campaign ? await this.gameService.getRepository().listByCampaign(campaign.id) : [];
  }

  characterLink(summary: CharacterSummary): string {
    return AppModeHelper.slug(summary.name) || summary.id;
  }

  openCharacter(summary: CharacterSummary){
    this.router.navigate(['/c', this.characterLink(summary)]);
  }

  popOutCharacter(summary: CharacterSummary){
    window.open('/c/' + this.characterLink(summary), '_blank');
  }

  isCurrentCharacter(summary: CharacterSummary): boolean {
    return this.gameService.getGame()?.id === summary.id;
  }

  // The logo returns to the active campaign's character list (or the dashboard when none is selected).
  goHome(){
    const campaign = this.campaignService.activeCampaign;
    this.router.navigate(campaign ? ['/campaign', campaign.id] : ['/']);
  }

  goToCampaigns(){
    this.router.navigate(['/']);
  }

  private async startSubdomain(){
    await this.authService.ready();
    if (this.authService.isAuthenticated() && await this.resolveSubdomainCharacter()) {
      this.router.navigate(['/character']);
      return;
    }
    this.loadLocalAndOpen();
  }

  // Map the subdomain label to one of the user's account characters so the legacy per-character
  // URL keeps working (now cloud-backed) instead of dragging them through the roster.
  private async resolveSubdomainCharacter(): Promise<boolean> {
    const label = AppModeHelper.subdomainLabel();
    if (!label)
      return false;

    const pinnedId = localStorage.getItem('odnd-subdomain-id');
    if (pinnedId && await this.gameService.loadCharacter(pinnedId))
      return true;

    const summaries = await this.gameService.getRepository().list();
    const matches = summaries.filter(s => AppModeHelper.slug(s.name) === label);
    if (matches.length === 1 && await this.gameService.loadCharacter(matches[0].id)) {
      // Pin the resolved id so the subdomain survives a later rename.
      localStorage.setItem('odnd-subdomain-id', matches[0].id);
      return true;
    }
    return false;
  }

  private loadLocalAndOpen(){
    // Once this device has used an account, a logged-out user must sign in — never show a local
    // character they might wrongly assume is cloud-backed. Home shows a sign-in prompt instead.
    if (localStorage.getItem('odnd-has-account'))
      return;
    this.gameService.importGame(localStorage.getItem('odnd-character'));
    // Only auto-open the sheet from the root; don't clobber a deep link (e.g. the /summary popup).
    if (this.gameService.getGame() && location.pathname === '/')
      this.router.navigate(['/character']);
  }

  login(){
    this.dialog.open(AuthDialogComponent, {width: '80vw', maxWidth: '800px'}).afterClosed().subscribe(ok => {
      if (ok)
        location.reload();
    });
  }

  async logout(){
    this.campaignService.setActive(null);
    // Drop cached account data so nothing from the signed-in session lingers after logout.
    Object.keys(localStorage)
      .filter(k => k.startsWith('odnd-cache:') || k === 'odnd-active-campaign')
      .forEach(k => localStorage.removeItem(k));
    await this.authService.signOut();
    location.assign('/');
  }

  changePassword(){
    this.dialog.open(SetPasswordDialogComponent, {width: '80vw', maxWidth: '800px', data: {title: 'Change Password'}});
  }

  private completeRecovery(){
    this.dialog.open(SetPasswordDialogComponent, {width: '80vw', maxWidth: '800px', data: {title: 'Set New Password'}})
      .afterClosed().subscribe(ok => {
        // Re-bootstrap as the now-authenticated user so the roster renders.
        if (ok)
          location.assign('/');
      });
  }

  exportGame() {
    const game = this.gameService.getGame();
    if (!game)
      return;
    const blob = new Blob([JSON.stringify(game)], {type: 'application/json'});
    const file = new File([blob], game.getCharacter().name + '.json', {type: 'application/vnd.ms.excel'});
    saveAs(file);
  }

  toggleMenu(){
    this.opened = !this.opened;
  }

  lockPage(){
    this.gameService.toggleLock()
  }

}
