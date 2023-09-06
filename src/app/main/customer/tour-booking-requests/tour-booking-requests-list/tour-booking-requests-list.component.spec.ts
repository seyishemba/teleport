import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBookingRequestsListComponent } from './tour-booking-requests-list.component';

describe('TourBookingRequestsListComponent', () => {
  let component: TourBookingRequestsListComponent;
  let fixture: ComponentFixture<TourBookingRequestsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourBookingRequestsListComponent]
    });
    fixture = TestBed.createComponent(TourBookingRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
