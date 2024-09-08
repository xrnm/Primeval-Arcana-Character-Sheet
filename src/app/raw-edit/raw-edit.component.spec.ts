import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RawEditComponent } from './raw-edit.component';

describe('RawEditComponent', () => {
  let component: RawEditComponent;
  let fixture: ComponentFixture<RawEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RawEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RawEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
