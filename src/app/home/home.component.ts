import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../game.service';
import {Router} from '@angular/router';
import {Game} from '../game';
import {MatDialog} from '@angular/material/dialog';
import {GenerateCharacterDialogComponent} from '../generate-character-dialog/generate-character-dialog.component';
import {Character} from '../character';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.sass'],
    imports: [MatButton, MatIcon]
})
export class HomeComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router, private dialog: MatDialog) { }
  @Output() imported = new EventEmitter<Game>();
  ngOnInit(): void {
  }
  importGame(event){
    let file = event.target.files[0];
    const reader: FileReader = new FileReader();
    reader.onloadend = function (e) {
      this.gameService.importGame(reader.result);
      this.router.navigate(['/character'])
    }.bind(this);
    reader.readAsText(file);
  }

  newCharacter(){
    this.gameService.newGame();
    this.router.navigate(['/character'])
  }

  generateCharacter(){
    const dialogRef = this.dialog.open(GenerateCharacterDialogComponent, {
      width: '90vw',
      maxWidth: '1000px'
    });
    dialogRef.afterClosed().subscribe((character: Character) => {
      if (character) {
        const game = this.gameService.newGame();
        game.character = character;
        this.router.navigate(['/character']);
      }
    });
  }
}
