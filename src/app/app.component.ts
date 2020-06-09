import {Component, Inject} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GameService} from "./game.service";
import {saveAs} from 'file-saver'
import {Game} from "./game";
import {Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  year = new Date().getFullYear();
  opened = false;

  constructor(@Inject(DOCUMENT) private document: Document, private titleService: Title, private router: Router, public gameService: GameService) {
  }

  ngOnInit(){
    const game = this.gameService.importGame(localStorage.getItem('odnd-character'));
    if(!!this.gameService.getGame())
      this.router.navigate(['/character'])
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
