import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterMountsComponent } from './character-mounts.component';

describe('CharacterMountsComponent', () => {
  let component: CharacterMountsComponent;
  let fixture: ComponentFixture<CharacterMountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterMountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterMountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
