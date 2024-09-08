import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterExperienceDialogComponent } from './character-experience-dialog.component';

describe('CharacterExperienceDialogComponent', () => {
  let component: CharacterExperienceDialogComponent;
  let fixture: ComponentFixture<CharacterExperienceDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterExperienceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterExperienceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
