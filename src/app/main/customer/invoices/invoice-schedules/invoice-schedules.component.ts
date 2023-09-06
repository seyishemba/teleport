import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';
// import { Invoice, InvoiceStatus } from 'src/app/leasing-agent/shared/models/invoice.model';
import { FormControl, FormArray, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-invoice-schedules',
  templateUrl: './invoice-schedules.component.html',
  styleUrls: ['./invoice-schedules.component.css']
})
export class InvoiceSchedulesComponent {
  @Input() invoice: any;
  adjustmentForm: FormGroup;
  adjustmentModal: boolean = false
  @ViewChild('datePicker') datePicker!: ElementRef;
  showDurationDropdown: boolean = false;
  selectedDuration: string = 'MONTHLY'

  tableColumns: TableColumn[] = [
    {
      key: "id",
      title: "Invoice Id"
    },
    {
      key: "issuanceDate",
      title: "Issued Date"
    },
    {
      key: "paidDate",
      title: "Paid Date"
    },
    {
      key: "totalAmount",
      title: "Total Amount"
    },
    {
      key: "status",
      title: "Status"
    },
    {
      key: 'view',
      title: 'View'
    }

  ]
  invoiceList = [
    {
      id: 1,
      issuanceDate: '21-08-23',
      paidDate: '21-08-23',
      totalAmount: 21,
      taxAmount: 32,
      balanceAmount: 31,
      status: "Paid",
    },
    {
      id: 1,
      issuanceDate: '21-08-23',
      paidDate: '21-08-23',
      totalAmount: 21,
      taxAmount: 32,
      balanceAmount: 31,
      status: "Paid",
    },
    {
      id: 1,
      issuanceDate: '21-08-23',
      paidDate: '21-08-23',
      totalAmount: 21,
      taxAmount: 32,
      balanceAmount: 31,
      status: "Paid",
    },
    {
      id: 1,
      issuanceDate: '21-08-23',
      paidDate: '21-08-23',
      totalAmount: 21,
      taxAmount: 32,
      balanceAmount: 31,
      status: "Paid",
    },
    {
      id: 1,
      issuanceDate: '21-08-23',
      paidDate: '21-08-23',
      totalAmount: 21,
      taxAmount: 32,
      balanceAmount: 31,
      status: "Paid",
    }

  ]

  durationArray = [
    { id: 1, name: 'ONE TIME' },
    { id: 2, name: 'WEEKLY' },
    { id: 3, name: 'BI-WEEKLY' },
    { id: 4, name: 'MONTHLY' },
  ]
  constructor(private fb: FormBuilder) {
    this.adjustmentForm = this.fb.group({
      adjustmentArray: this.fb.array([this.newAdjustment()])
    })
  }

  ngOnViewInit() {

  }

  ngOnInit() {

  }

  selectDuration(duration: string) {
    console.log("here")
    this.selectedDuration = duration
    this.showDurationDropdown = false

  }

  get adjustments() {
    return this.adjustmentForm.get('adjustmentArray') as FormArray;
  }

  newAdjustment() {
    return this.fb.group({
      adjusted_cycle: '',
      adjusted_amount: '',
      description: ''
    })
  }

  addAdjustment() {
    this.adjustments.push(this.newAdjustment())
  }

  openProfile() {
    console.log("Profile")
  }


  ngAfterViewInit() {

  }

  showDuration() {
    this.showDurationDropdown = true

  }

  closeDuration() {
    this.showDurationDropdown = false;
  }

  openModal() {

  }

  submit() {
    console.log(this.adjustmentForm.value)
  }

  openAdjustmentModal() {
    this.adjustmentModal = true
  }
  closeAdjustmentModal() {
    this.adjustmentModal = false
  }

  getAdjustmentData(event: Event) {
    console.log(event)
  }
}
