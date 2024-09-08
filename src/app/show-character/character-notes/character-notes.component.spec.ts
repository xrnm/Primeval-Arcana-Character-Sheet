import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterNotesComponent } from './character-notes.component';

describe('CharacterNotesComponent', () => {
  let component: CharacterNotesComponent;
  let fixture: ComponentFixture<CharacterNotesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
