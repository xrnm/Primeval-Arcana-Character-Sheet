import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {GameService} from "./game.service";
import {saveAs} from 'file-saver'
import {Game} from "./game";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  game: Game;
  constructor(private titleService: Title, private router: Router, public gameService: GameService) {
    this.titleService = titleService;
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

}
