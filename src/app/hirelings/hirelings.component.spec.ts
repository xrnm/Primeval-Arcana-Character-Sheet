import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HirelingsComponent } from './hirelings.component';

describe('HirelingsComponent', () => {
  let component: HirelingsComponent;
  let fixture: ComponentFixture<HirelingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HirelingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HirelingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
