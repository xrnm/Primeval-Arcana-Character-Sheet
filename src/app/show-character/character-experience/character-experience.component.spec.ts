import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterExperienceComponent } from './character-experience.component';

describe('CharacterExperienceComponent', () => {
  let component: CharacterExperienceComponent;
  let fixture: ComponentFixture<CharacterExperienceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterExperienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
