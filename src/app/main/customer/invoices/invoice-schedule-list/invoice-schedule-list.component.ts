import { Component } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-schedule-list',
  templateUrl: './invoice-schedule-list.component.html',
  styleUrls: ['./invoice-schedule-list.component.css']
})
export class InvoiceScheduleListComponent {

  constructor(private route: Router) {

  }
  tableColumns: TableColumn[] = [
    {
      key: "tour",
      title: "Tour Name"
    },
    {
      key: "invoices",
      title: "Invoices"
    },
    {
      key: "client",
      title: "Client"
    },
    {
      key: "balanceAmount",
      title: "Balance"
    },
    {
      key: "paidAmount",
      title: "Paid Amount"
    },
    {
      key: "frequency",
      title: "Frequency"
    },
    {
      key: "nextBillDate",
      title: "Next Bill Date"
    },
    {
      key: "status",
      title: "Status"
    },
    {
      key: "view",
      title: ''
    }
  ]
  invoiceList = [
    {
      id: 1,
      nextBillDate: '22/07/23',
      invoices: '5/6',
      client: 'Mia Carter',
      subtotal: 21,
      paidAmount: 133,
      balanceAmount: 323,
      type: '',
      status: "Completed",
      frequency: "Bi-Weekly",
      tour: "Majestry Mountains Expedition"
    },
    {
      id: 2,
      nextBillDate: '12/08/23',
      invoices: '3/4',
      client: 'Emma Anderson',
      subtotal: 21,
      paidAmount: 1163,
      balanceAmount: 31133,
      type: '',
      status: "Completed",
      frequency: "One Time",
      tour: "Wildlife Safari Spectacular"
    },
    {
      id: 3,
      nextBillDate: '02/08/23',
      invoices: '5/6',
      client: 'Ethan Thompson',
      subtotal: 21,
      paidAmount: 67123,
      balanceAmount: 651123,
      type: '',
      status: "Cancelled",
      frequency: "Yearly",
      tour: "Historic City Walking Tour"
    },
    {
      id: 4,
      nextBillDate: '05/07/23',
      invoices: '2/2',
      client: 'Ethan Thompson',
      subtotal: 21,
      paidAmount: 35123,
      balanceAmount: 73123,
      type: '',
      status: "In progress",
      frequency: "Weekly",
      tour: "Coastal Paradise Adventure"
    },
    {
      id: 5,
      nextBillDate: '01/06/23',
      invoices: '1/1',
      client: 'Olivia Taylor',
      subtotal: 21,
      paidAmount: 67123,
      balanceAmount: 56123,
      type: '',
      status: "Completed",
      frequency: "Monthly",
      tour: "Cultural Heritage Discovery"
    },
  ]

  getId(event: any) {
    console.log(event)
    this.route.navigate(['/client/invoice/details'])
  }


}
