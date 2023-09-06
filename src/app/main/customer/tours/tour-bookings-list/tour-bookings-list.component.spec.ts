import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBookingsListComponent } from './tour-bookings-list.component';

describe('TourBookingsListComponent', () => {
  let component: TourBookingsListComponent;
  let fixture: ComponentFixture<TourBookingsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TourBookingsListComponent]
    });
    fixture = TestBed.createComponent(TourBookingsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
