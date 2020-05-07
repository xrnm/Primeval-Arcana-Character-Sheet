import { Component, OnInit, Input } from '@angular/core';
import {ExperienceBlock} from "../../experience-block";
import {Experience} from "../../experience";

@Component({
  selector: 'adventure-log-experience-blocks',
  templateUrl: './experience-blocks.component.html',
  styleUrls: ['./experience-blocks.component.sass']
})
export class ExperienceBlocksComponent implements OnInit {
  @Input() blocks: ExperienceBlock[];
  constructor() { }

  ngOnInit(): void {
  }

  addExperience(block: ExperienceBlock){
    console.log('meow');
    block.addExperience(new Experience({date: new Date(), points:0}))
  }
  deleteExperience(experience: Experience, block: ExperienceBlock){
    block.removeExperience(experience)
  }

}
