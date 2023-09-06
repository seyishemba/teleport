import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TourBookingRequestDetailsComponent } from './tour-booking-request-details.component';

describe('TourBookingRequestDetailsComponent', () => {
    let component: TourBookingRequestDetailsComponent;
    let fixture: ComponentFixture<TourBookingRequestDetailsComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TourBookingRequestDetailsComponent],
        });
        fixture = TestBed.createComponent(TourBookingRequestDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
