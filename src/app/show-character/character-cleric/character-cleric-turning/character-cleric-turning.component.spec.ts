import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterClericTurningComponent } from './character-cleric-turning.component';

describe('CharacterClericTurningComponent', () => {
  let component: CharacterClericTurningComponent;
  let fixture: ComponentFixture<CharacterClericTurningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterClericTurningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterClericTurningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
