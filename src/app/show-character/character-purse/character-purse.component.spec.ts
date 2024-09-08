import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterPurseComponent } from './character-purse.component';

describe('CharacterPurseComponent', () => {
  let component: CharacterPurseComponent;
  let fixture: ComponentFixture<CharacterPurseComponent>;

  beforeEach(waitForAsync(() => {
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
