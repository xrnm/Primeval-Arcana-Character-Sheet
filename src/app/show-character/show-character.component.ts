import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Character} from "../character";
import {GameService} from "../game.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppModeHelper} from "../app-mode-helper";

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CharacterOverviewComponent } from './character-overview/character-overview.component';
import { CharacterAttributesComponent } from './character-attributes/character-attributes.component';
import { CharacterClericComponent } from './character-cleric/character-cleric.component';
import { CharacterSpellBookComponent } from './character-spell-book/character-spell-book.component';
import { CharacterExperienceComponent } from './character-experience/character-experience.component';
import { CharacterPurseComponent } from './character-purse/character-purse.component';
import { CharacterInventoryComponent } from './character-inventory/character-inventory.component';
import { CharacterMountsComponent } from './character-mounts/character-mounts.component';
import { CharacterNotesComponent } from './character-notes/character-notes.component';

@Component({
    selector: 'app-show-character',
    templateUrl: './show-character.component.html',
    styleUrls: ['./show-character.component.sass'],
    imports: [CdkDropListGroup, CharacterOverviewComponent, CharacterAttributesComponent, CharacterClericComponent, CharacterSpellBookComponent, CharacterExperienceComponent, CharacterPurseComponent, CharacterInventoryComponent, CharacterMountsComponent, CharacterNotesComponent]
})
export class ShowCharacterComponent implements OnInit, OnDestroy {
  character: Character;
  private sub?: Subscription;
  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // React to param changes, not just the initial snapshot — switching /c/a -> /c/b reuses this
    // component, so ngOnInit alone wouldn't reload the character.
    this.sub = this.route.paramMap.subscribe(params => this.load(params.get('slug')));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  private async load(slug: string | null): Promise<void> {
    if (slug) {
      const id = await this.resolveId(slug);
      if (id && this.gameService.getGame()?.id !== id)
        await this.gameService.loadCharacter(id);
    }

    if (!this.gameService.getGame()) {
      this.router.navigate(['']);
      return;
    }
    this.character = this.gameService.getGame().getCharacter();
  }

  // The URL carries the character's name slug for readability; a raw UUID is still accepted
  // (new/unnamed characters and old links). Resolve the slug back to an id via the account list.
  private async resolveId(slug: string): Promise<string | null> {
    if (UUID_RE.test(slug))
      return slug;
    const summaries = await this.gameService.getRepository().list();
    const match = summaries.find(s => AppModeHelper.slug(s.name) === slug.toLowerCase());
    return match ? match.id : null;
  }

}
