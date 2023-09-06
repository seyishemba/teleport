import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-stop',
    templateUrl: './add-stop.component.html',
    //   styleUrls: ['./modal.component.css'],
})
export class AddStopComponent {
    @Output() closeModal = new EventEmitter<void>();
    @ViewChild('createModal', { static: true }) modal: ModalDirective;
    routeForm: FormGroup;
    saving = false;
    active = false;


    constructor(private fb: FormBuilder) {
        this.routeForm = this.fb.group({
            location: '',
            departure_date: '',
            leg_miles: '',
            leg_drive_time: ''
        })

    }


    show() {
        this.active = true;
        this.modal.show();
    }


    close(): void {
        this.active = false;
        this.modal.hide();
    }



}
