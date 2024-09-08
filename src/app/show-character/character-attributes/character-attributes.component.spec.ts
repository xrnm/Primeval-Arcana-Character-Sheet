import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterAttributesComponent } from './character-attributes.component';

describe('CharacterAttributesComponent', () => {
  let component: CharacterAttributesComponent;
  let fixture: ComponentFixture<CharacterAttributesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
