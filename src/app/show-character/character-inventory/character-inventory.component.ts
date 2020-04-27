import { Component, OnInit, Input } from '@angular/core';
import {Character} from "../../character";

@Component({
  selector: 'character-inventory',
  templateUrl: './character-inventory.component.html',
  styleUrls: ['./character-inventory.component.sass']
})
export class CharacterInventoryComponent implements OnInit {
  @Input() character: Character
  constructor() { }

  ngOnInit(): void {
  }

}
