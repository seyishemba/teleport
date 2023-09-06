import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-other-details',
    templateUrl: './other-details.component.html',
    styleUrls: ['./other-details.component.css'],
})
export class OtherDetailsComponent {
    @Output() otherDetailsInfo = new EventEmitter();
    @Output() goBack = new EventEmitter();
    dropDownTouched: any = {};
    otherDetails: FormGroup;

    maritalOptions: { label: string; value: any }[] = [
        { label: 'single', value: 'single' },
        { label: 'married', value: 'married' },
    ];

    smokeOptions: { label: string; value: any }[] = [
        { label: 'yes', value: true },
        { label: 'no', value: false },
    ];

    starBunkOptions: { label: string; value: any }[] = [
        { label: '4 bunks', value: 4 },
        { label: '5 bunks', value: 5 },
        { label: '6 bunks', value: 6 },
    ];
    countries: { label: string; value: any }[] = [
        { label: 'USA', value: 'USA'},
        { label: 'Canada', value: 'Canada'},
        { label: 'Mexico', value: 'Mexico' },
    ];
    currentDate = new Date();
    maxDate = new Date(this.currentDate.getFullYear() - 0, this.currentDate.getMonth(), this.currentDate.getDate());
    constructor(private fb: FormBuilder) {
        this.otherDetails = this.fb.group({
            homeAddress: ['', [Validators.required]],
            allergies: ['', [Validators.required]],
            passportIssueDate: ['', Validators.required],
            passportExpireDate: ['', Validators.required],
            preCheck: ['', [Validators.min(0), Validators.required]],
            passportNumber: ['', Validators.required],
            maritalStatus: [null, [Validators.min(0)]],
            seatPreference: [null, [Validators.min(0)]],
            doYouSmoke: [null, [Validators.min(0)]],
            passportCountry: [null, [Validators.min(0)]],
        });
    }

    onBlur(value: string) {
        this.dropDownTouched = { ...this.dropDownTouched, [value]: true };
    }

    onNext(): void {
        if (this.otherDetails.valid) {
            this.otherDetailsInfo.emit({ ...this.otherDetails.value });
        } else {
            this.otherDetails.markAllAsTouched();
            return;
        }
    }
}
