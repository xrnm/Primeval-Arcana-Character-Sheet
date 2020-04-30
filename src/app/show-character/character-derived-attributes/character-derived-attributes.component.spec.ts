import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterDerivedAttributesComponent } from './character-derived-attributes.component';

describe('CharacterDerivedAttributesComponent', () => {
  let component: CharacterDerivedAttributesComponent;
  let fixture: ComponentFixture<CharacterDerivedAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterDerivedAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterDerivedAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
