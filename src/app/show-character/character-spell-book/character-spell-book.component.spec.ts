import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterSpellBookComponent } from './character-spell-book.component';

describe('CharacterSpellBookComponent', () => {
  let component: CharacterSpellBookComponent;
  let fixture: ComponentFixture<CharacterSpellBookComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterSpellBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterSpellBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
