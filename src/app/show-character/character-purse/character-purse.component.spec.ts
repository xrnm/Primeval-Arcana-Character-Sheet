import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterPurseComponent } from './character-purse.component';

describe('CharacterPurseComponent', () => {
  let component: CharacterPurseComponent;
  let fixture: ComponentFixture<CharacterPurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterPurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterPurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
