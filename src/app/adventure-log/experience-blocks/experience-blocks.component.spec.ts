import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExperienceBlocksComponent } from './experience-blocks.component';

describe('ExperienceBlocksComponent', () => {
  let component: ExperienceBlocksComponent;
  let fixture: ComponentFixture<ExperienceBlocksComponent>;

  beforeEach(waitForAsync(() => {
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
