import { Component, Input } from '@angular/core';
import { InvoicesServiceProxy } from '@shared/service-proxies/service-proxies';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { InvoiceService } from '../invoices.service';
// import { Invoice } from 'src/app/leasing-agent/shared/models/invoice.model';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  // @Input() invoice: any;
  invoiceList: [] = [];

  constructor(private invoicesService: InvoicesServiceProxy) {


  }

  ngOnInit() {
    this.getAllInvoices();
  }

  getAllInvoices(): void {
    console.log("We are running here")
    this.invoicesService.getAll('', '', '', '', 0, 100).subscribe({
      next: (repsonse) => {
        console.log('res', repsonse)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }


}
