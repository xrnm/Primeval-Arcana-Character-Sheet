import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterClericComponent } from './character-cleric.component';

describe('CharacterClericComponent', () => {
  let component: CharacterClericComponent;
  let fixture: ComponentFixture<CharacterClericComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterClericComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterClericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
