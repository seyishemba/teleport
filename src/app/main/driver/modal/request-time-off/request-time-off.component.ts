import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'request-time-off',
    templateUrl: './request-time-off.component.html',
    styleUrls: ['./request-time-off.component.css'],
})
export class RequestTimeOffComponent {
    @ViewChild('requestTimeOff', { static: true }) modal: ModalDirective;
    saving;
    requestInfo: FormGroup;

    constructor(private fb: FormBuilder) {
        this.requestInfo = this.fb.group({
            leave: ['Personal Leave', [Validators.required]],
            startDate: ['', Validators.required],
            endDate: ['', Validators.required],
            availableAt: ['', Validators.required],
            comments: ['', [Validators.required]],
        });
    }

    submit() {
        if (this.requestInfo.valid) {
            console.log(this.requestInfo.value);
        } else {
            this.requestInfo.markAllAsTouched();
            return;
        }
    }
}
