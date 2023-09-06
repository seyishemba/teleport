import { Component, OnInit } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../invoices.service';
import { Observable, forkJoin, of, switchMap, take } from 'rxjs';
// import { Invoice } from 'src/app/leasing-agent/shared/models/invoice.model';
// import { TourBooking } from 'src/app/leasing-agent/shared/models/tour-booking.model';
// import { TourBookingService } from '../../tour-bookings/tour-booking.service';
import { HttpClient } from '@angular/common/http';
import { InvoicesServiceProxy } from '@shared/service-proxies/service-proxies';
// import { environment } from 'src/environments/environment';
// import { ReturnObject } from 'src/app/shared/models/return-object.model';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  // apiEndpoint = environment.apiUrl;
  viewInvoice = false;
  selectedInvoice = {};
  isModalOpen = false;
  filterPillsList: string[] = [];
  dropDownSortingList: string[] = ['Date'];
  tableColumns: TableColumn[] = [
    {
      key: 'pin',
      title: 'Pinned'
    },
    {
      key: 'id',
      title: 'Invoice Number'
    },
    {
      key: 'tourName',
      title: 'Tour Name',
      render: (value: any, record: any) => record?.tour?.name
    },
    {
      key: 'tourDate',
      title: 'Tour Date',
      render: (value: any, record: any) => record?.tour?.date
    },
    {
      key: 'dueDate',
      title: 'Due Date'
    },
    {
      key: 'totalAmount',
      title: 'Amount'
    },
    {
      key: 'status',
      title: 'Status'
    },
    {
      key: 'view',
      title: ''
    }
  ];
  invoiceList: [] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoicesServiceProxy,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllInvoices();
  }

  getAllInvoices(): void {
    this.invoiceService.getAll('', '', '', '', 0, 100).subscribe({
      next: (repsonse) => {
        console.log('res', repsonse)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }



  onOpenAddContractModal() {
    this.isModalOpen = true;
  }

  onCloseModal() {
    this.isModalOpen = false;
  }

  onAddFilterPill(filterText: string): void {
    this.filterPillsList.push(filterText);
  }

  onViewInvoice(row: any): void {
    this.viewInvoice = true;
    this.selectedInvoice = row;
  }

  onRemoveFilterPill(pillIndex: number): void {
    this.filterPillsList.splice(pillIndex, 1);
  }

  onCloseInvoiceView(): void {
    this.viewInvoice = false;
  }
}
