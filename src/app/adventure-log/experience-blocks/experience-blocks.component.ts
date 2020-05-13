import { Component, OnInit, Input } from '@angular/core';
import {ExperienceBlock} from "../../experience-block";
import {Experience} from "../../experience";
import {GameService} from "../../game.service";

@Component({
  selector: 'adventure-log-experience-blocks',
  templateUrl: './experience-blocks.component.html',
  styleUrls: ['./experience-blocks.component.sass']
})
export class ExperienceBlocksComponent implements OnInit {
  @Input() blocks: ExperienceBlock[];
  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  addExperience(block: ExperienceBlock){
    if(this.gameService.lock)
      return;

    block.addExperience(new Experience({date: new Date(), points:0}))
  }
  deleteExperience(experience: Experience, block: ExperienceBlock){
    if(this.gameService.lock)
      return;
    block.removeExperience(experience)
  }

}
