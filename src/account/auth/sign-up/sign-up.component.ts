import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
    // Booking forms
    FORMS = {
        personalInfo: 'personal information',
        otherDetails: 'other details',
        emergency: 'emergency contanct',
        summary: 'summary page',
    };

    currentForm = this.FORMS.personalInfo;

    personalInfo: any;
    otherDetails: any;
    emergency: any;
    file: any;

    constructor() {}
}
