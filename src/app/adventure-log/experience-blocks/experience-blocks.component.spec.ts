import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExperienceBlocksComponent } from './experience-blocks.component';

describe('ExperienceBlocksComponent', () => {
  let component: ExperienceBlocksComponent;
  let fixture: ComponentFixture<ExperienceBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExperienceBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExperienceBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
