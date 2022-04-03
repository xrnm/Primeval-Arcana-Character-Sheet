import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterClericDeityComponent } from './character-cleric-deity.component';

describe('CharacterClericDeityComponent', () => {
  let component: CharacterClericDeityComponent;
  let fixture: ComponentFixture<CharacterClericDeityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterClericDeityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterClericDeityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
