import { Component, OnInit } from '@angular/core';
import { Character} from "../character";
import {CHLORR} from "../chlorr";

@Component({
  selector: 'app-show-character',
  templateUrl: './show-character.component.html',
  styleUrls: ['./show-character.component.sass']
})
export class ShowCharacterComponent implements OnInit {
  character: Character = CHLORR;
  constructor() { }

  ngOnInit(): void {
  }

}
