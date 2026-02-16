import { Component, OnInit } from '@angular/core';
import {GameService} from "../game.service";
import {Router} from "@angular/router";
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-raw-edit',
    templateUrl: './raw-edit.component.html',
    styleUrls: ['./raw-edit.component.sass'],
    imports: [FormsModule, MatButton]
})
export class RawEditComponent implements OnInit {
  raw: string;
  constructor(private gameService: GameService, private router: Router) {
  }

  ngOnInit(): void {
    this.raw = JSON.stringify(this.gameService.getGame(),undefined, 4);
  }

  save(){
    this.gameService.importGame(this.raw);
    this.router.navigate(['character'])
  }
}
