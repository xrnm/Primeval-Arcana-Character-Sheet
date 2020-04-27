import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterExperienceComponent } from './character-experience.component';

describe('CharacterExperienceComponent', () => {
  let component: CharacterExperienceComponent;
  let fixture: ComponentFixture<CharacterExperienceComponent>;

  beforeEach(async(() => {
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
