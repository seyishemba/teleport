import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-emergency-contact',
    templateUrl: './emergency-contact.component.html',
    styleUrls: ['./emergency-contact.component.css'],
})
export class EmergencyContactComponent {
    @Output() emergencyInfo = new EventEmitter();
    @Output() goBack = new EventEmitter();
    dropDownTouched: any = {};
    emergency: FormGroup;

    relationshipOptions: { label: string; value: any }[] = [
        { label: 'wife', value: 'wife' },
        { label: 'husband', value: 'husband' },
    ];
    constructor(private fb: FormBuilder) {
        this.emergency = this.fb.group({
            primary: this.fb.group({
                fullName: ['', [Validators.required]],
                phoneNumber: ['', Validators.required],
                relationship: [null, [Validators.min(0)]],
            }),
            secondary: this.fb.group({
                fullName: ['', [Validators.required]],
                phoneNumber: ['', Validators.required],
                relationship: [null, [Validators.min(0)]],
            }),
        });
    }

    onBlur(value: string) {
        this.dropDownTouched = { ...this.dropDownTouched, [value]: true };
    }

    onNext(): void {
        if (this.emergency.valid) {
            this.emergencyInfo.emit({ ...this.emergency.value });
        } else {
            this.emergency.markAllAsTouched();
            return;
        }
    }
}
