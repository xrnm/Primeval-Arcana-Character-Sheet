import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
    selector: 'app-links',
    templateUrl: './links.component.html',
    styleUrls: ['./links.component.sass'],
    imports: [RouterLink, RouterLinkActive]
})
export class LinksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
