import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CharacterOverviewComponent } from './character-overview.component';

describe('CharacterOverviewComponent', () => {
  let component: CharacterOverviewComponent;
  let fixture: ComponentFixture<CharacterOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
