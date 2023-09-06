import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestTimeOffComponent } from './request-time-off.component';

describe('RequestTimeOffComponent', () => {
  let component: RequestTimeOffComponent;
  let fixture: ComponentFixture<RequestTimeOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestTimeOffComponent]
    });
    fixture = TestBed.createComponent(RequestTimeOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
