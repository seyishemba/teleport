import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-personal-information',
    templateUrl: './personal-information.component.html',
    styleUrls: ['./personal-information.component.css'],
})
export class PersonalInformationComponent {
    @Output() personalInformation = new EventEmitter();
    dropDownTouched: any = {};
    personalInfo: FormGroup;
    file: any;

    shirtOptions: { label: string; value: any }[] = [
        { label: 'small', value: 'small' },
        { label: 'medium', value: 'medium' },
        { label: 'large', value: 'large' },
    ];

    starBunkOptions: { label: string; value: any }[] = [
        { label: '4 bunks', value: 4 },
        { label: '5 bunks', value: 5 },
        { label: '6 bunks', value: 6 },
    ];



    currentDate = new Date();
    maxDate = new Date(this.currentDate.getFullYear() - 15, this.currentDate.getMonth(), this.currentDate.getDate());

    constructor(private fb: FormBuilder) {
        this.personalInfo = this.fb.group({
            fullName: ['', [Validators.required]],
            email: ['', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'), Validators.required]],
            nickName: ['', [Validators.required]],
            address: ['', [Validators.required]],
            dateOFBirth: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            homeNumber: ['', Validators.required],
            cdlClass: [null, [Validators.min(0)]],
            shirtSize: [null, [Validators.min(0)]],
        });
    }

    onBlur(value: string) {
        this.dropDownTouched = { ...this.dropDownTouched, [value]: true };
        console.log(this.personalInfo?.get('shirtSize')?.value);
    }

    // Various form event handlers
    onAddMedia(event: any): void {
        if (event.target.files.length > 0) {
            this.file = event.target.files[0];
        }
    }

    onNext(): void {
        let formValue: Partial<any> = {}; // Define formValue as a partial TourBookingRequest

        if (this.personalInfo.valid) {
            formValue = { ...this.personalInfo.value, file: this.file };
            this.personalInformation.emit(formValue);
        } else {
            this.personalInfo.markAllAsTouched();
            return;
        }
    }
}
