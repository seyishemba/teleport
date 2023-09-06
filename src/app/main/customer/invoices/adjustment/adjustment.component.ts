import { Component, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-adjustment',
  templateUrl: './adjustment.component.html',
  styleUrls: ['./adjustment.component.css']
})
export class AdjustmentComponent {
  @Input() adjustmentModal = false
  @Input() action = 'edit';
  @Output() adjustmentData = new EventEmitter()
  adustmentActionForm: FormGroup

  constructor(private fb: FormBuilder) {
    this.adustmentActionForm = this.fb.group({
      billingCycle: [0],
      billingAmount: [0],
      effectiveDate: '',
      description: ['']
    })
  }
  closeAdjustmentModal() {
    this.adjustmentModal = false
  }

  submit() {
    let results = this.adustmentActionForm.value
    this.adjustmentData.emit(results)
  }
}
