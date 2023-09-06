import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBookingRequestFormComponent } from './tour-booking-request-form.component';

describe('TourBookingRequestFormComponent', () => {
  let component: TourBookingRequestFormComponent;
  let fixture: ComponentFixture<TourBookingRequestFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourBookingRequestFormComponent]
    });
    fixture = TestBed.createComponent(TourBookingRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
