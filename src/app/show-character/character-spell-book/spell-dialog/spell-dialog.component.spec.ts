import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SpellDialogComponent } from './spell-dialog.component';

describe('SpellDialogComponent', () => {
  let component: SpellDialogComponent;
  let fixture: ComponentFixture<SpellDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SpellDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpellDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
