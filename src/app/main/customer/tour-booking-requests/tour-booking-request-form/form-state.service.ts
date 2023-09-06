import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// TourBookingRequest
@Injectable({
    providedIn: 'root',
})
export class FormStateService {
    private _booking = new BehaviorSubject<Partial<any> | null>(null);
    // eslint-disable-next-line @typescript-eslint/member-ordering
    public booking$ = this._booking.asObservable();

    updateFormState(booking: Partial<any>) {
        this._booking.next(booking);
    }

    clearFormState() {
        this._booking.next(null);
    }
}
