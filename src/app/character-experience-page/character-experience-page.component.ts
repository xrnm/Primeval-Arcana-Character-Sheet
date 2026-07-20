import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../game.service';
import {Character} from '../character';
import {AppModeHelper} from '../app-mode-helper';
import {ExperienceBlocksComponent} from '../adventure-log/experience-blocks/experience-blocks.component';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

@Component({
    selector: 'app-character-experience-page',
    templateUrl: './character-experience-page.component.html',
    styleUrls: ['./character-experience-page.component.sass'],
    imports: [ExperienceBlocksComponent]
})
export class CharacterExperiencePageComponent implements OnInit {
  character: Character;

  constructor(private gameService: GameService, private router: Router, private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    // Character is identified in the URL so the page survives reload / direct access.
    const slug = this.route.snapshot.paramMap.get('slug');
    const id = await this.resolveId(slug);
    if (id && this.gameService.getGame()?.id !== id)
      await this.gameService.loadCharacter(id);

    if (!this.gameService.getGame()) {
      this.router.navigate(['']);
      return;
    }
    this.character = this.gameService.getGame().getCharacter();
  }

  private async resolveId(slug: string): Promise<string | null> {
    if (!slug || UUID_RE.test(slug))
      return slug;
    const summaries = await this.gameService.getRepository().list();
    const match = summaries.find(s => AppModeHelper.slug(s.name) === slug.toLowerCase());
    return match ? match.id : null;
  }
}
