import { TableColumn } from 'pilgrim-ng-ui-library';
// import { InvoiceStatus } from 'src/app/leasing-agent/shared/models/invoice.model';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
// import ServicesArray from './productServices'
import { InvoiceService } from '../invoices.service';
// import { Invoice as NewInvoice } from 'src/app/leasing-agent/shared/models/new.invoice.model'

@Component({
  selector: 'app-invoice-schedule-detail',
  templateUrl: './invoice-schedule-detail.component.html',
  styleUrls: ['./invoice-schedule-detail.component.css']
})
export class InvoiceScheduleDetailComponent {
  @Input() invoice: any;
  displayLabel: any
  dropDown = false

  tableColumns: TableColumn[] = [
    {
      key: 'tour',
      title: 'Tour Name'
    },
    {
      key: 'invoice',
      title: 'Invoices'
    },
    {
      key: 'client',
      title: 'Client'
    },
    {
      key: 'balanceAmount',
      title: 'Balance'
    },
    {
      key: 'paidAmount',
      title: 'Paid Amount'
    },
    {
      key: 'frequency',
      title: 'Frequency'
    },
    {
      key: 'createdOn',
      title: 'Next Bill Date'
    },
    {
      key: 'status',
      title: 'Status'
    }
  ]
  invoiceList = [
    {
      id: 1,
      issuanceDate: '21-08-23',
      dueDate: '21-08-23',
      subtotal: 21,
      taxAmount: 32,
      paidAmount: 21,
      balanceAmount: 31,
      type: '',
      status: 'Paid',
      userId: 123,
      createdBy: 'string',
      createdOn: '21-08-23',
      updatedBy: 'string',
      updatedOn: '21-08-23',
      summary: 'string',
      comments: 'string',
      tourId: 21
    }
  ]

  products = [
    {
      id: 1,
      name: 'Interior',
      desc: 'Interior Stuff Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
      unit: 3
    },
    {
      id: 2,
      name: 'Exterior',
      desc: 'Exterior Stuff Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
      unit: 4
    },
    {
      id: 1,
      name: 'Shower',
      desc: 'Shower Stuff Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
      unit: 2
    },
    {
      id: 1,
      name: 'Other',
      desc: 'Other Stuff Lorem Ipsum It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout',
      unit: 5
    }
  ]

  productServices: any = []
  allInvoices: any = []

  title = 'quickbooks'
  quickTable: FormGroup;
  totalAmount = 0;
  constructor(private fb: FormBuilder, private invoiceServ: InvoiceService) {
    this.quickTable = this.fb.group({
      recordsArray: this.fb.array([this.newRecord()])
    })
  }

  get records() {
    return this.quickTable.get('recordsArray') as FormArray;
  }

  getProducts() {
    // this.invoiceServ.getProducts().subscribe(
    //   {
    //     next: (response) => {
    //       if (response?.success === true) {
    //         this.productServices = response?.data

    //       }

    //     },
    //     error: (error) => {
    //       console.log(error)
    //     }
    //   }
    // )
  }

  getInvoices() {
    // this.invoiceServ.getAllInvoices().subscribe(
    //   {
    //     next: (response) => {
    //       if (response?.success === true) {
    //         this.allInvoices = response?.data
    //         this.loadInvoices();
    //       }

    //     },
    //     error: (error) => {
    //       console.log(error)
    //     }
    //   }
    // )
  }

  newRecord() {
    return this.fb.group({
      product: '',
      description: '',
      unit: [0, [Validators.required]],
      date: [''],
      quantity: [0, [Validators.required]],
      rate: [0, [Validators.required]],
      amount: [0, [Validators.required]],
    })
  }

  ngOnInit() {

    this.getProducts();
    this.getInvoices();

  }

  loadInvoices() {


    if (this.allInvoices.length > 0) {


      for (let i = 0; i < this.allInvoices.length; i++) {
        const dateObject = new Date(this.allInvoices[i]['LastModificationTime']);
        const formattedDate = dateObject.toISOString().substring(0, 10);
        const numericPart = this.allInvoices[i]['LineItemCost'].replace(/[^\d.-]/g, '');
        let amount = numericPart * this.allInvoices[i]['LineItemQuantity']
        this.totalAmount += amount

        let newData = this.fb.group({
          product: this.allInvoices[i]['InvoiceItemsId'],
          description: this.allInvoices[i]['Description'],
          unit: [this.allInvoices[i]['LineItemUnits'], Validators.required],
          date: [formattedDate],
          quantity: [this.allInvoices[i]['LineItemQuantity'], Validators.required],
          rate: [numericPart, Validators.required],
          amount: [amount, Validators.required],
        })
        this.records.push(newData)
      }

    }
  }

  addRecord() {
    this.records.push(this.newRecord())
  }

  deleteRecord(index: number) {
    this.records.removeAt(index)
  }


  fire(index: number) {
    if (this.records.length == index + 1) {
      this.addRecord()
    }
  }
  drop(event: any) {

    moveItemInArray(event?.container.data?.controls, event.previousIndex, event.currentIndex)
  }

  calculateRate(index: number) {
    let rate = this.records.at(index).get('rate')?.value;
    let quantity = this.records.at(index).get('quantity')?.value
    let amount = 0;
    if (rate && quantity) {
      amount = rate * quantity

      this.records.at(index).get('amount')?.setValue(amount)
      let currentIndex = index + 1
      this.totalAmount = 0
      for (let i = 0; i < currentIndex; i++) {

        this.totalAmount += this.records.at(i).get('amount')?.value

      }
    }

  }

  selectAllText(event: any) {
    let input = event.target
    input.select()
  }

  selectItem(item: any) {
    console.log(item)
    this.displayLabel = item?.name
  }

  onFocus() {
    this.dropDown = true
  }

  onBlur() {
    this.dropDown = false
  }



  getSelection(event: any, index: number) {

    // console.log(event)
    this.records.at(index).get('product')?.setValue(event?.Id)
    this.records.at(index).get('description')?.setValue(event?.Description)
    this.records.at(index).get('quantity')?.setValue(event?.DefaultQuantity)
    this.records.at(index).get('unit')?.setValue(event?.DefaultUnits)
  }

  submit() {
    console.log(this.quickTable.invalid)
    console.log(this.quickTable.value)
    console.log(this.quickTable.invalid)
    // for (let i of this.quickTable.value) {

    // }
  }


}
