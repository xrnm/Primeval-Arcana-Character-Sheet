import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AdventureLogComponent } from './adventure-log.component';

describe('AdventureLogComponent', () => {
  let component: AdventureLogComponent;
  let fixture: ComponentFixture<AdventureLogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdventureLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdventureLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
