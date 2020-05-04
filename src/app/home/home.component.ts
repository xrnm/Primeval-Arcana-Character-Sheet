import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from "../game.service";
import {Router} from "@angular/router";
import {Game} from "../game";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) { }
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

}
