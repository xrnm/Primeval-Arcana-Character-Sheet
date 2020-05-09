import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerDialogComponent } from './container-dialog.component';

describe('ContainerDialogComponent', () => {
  let component: ContainerDialogComponent;
  let fixture: ComponentFixture<ContainerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContainerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
