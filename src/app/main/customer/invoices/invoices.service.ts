import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, Optional, InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  // apiEndpoint = environment.apiUrl;
  baseUrl = 'https://5f88-154-160-30-112.ngrok-free.app/api/services/app/Invoices';
  // http


  constructor(private http: HttpClient) { }



  getAllInvoices(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAll`);
  }

  getInvoiceForView(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetInvoiceForView?id=${id}`);
  }

  getInvoiceForEdit(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetInvoiceForEdit?id=${id}`);
  }

  createOrEditInvoice(invoiceData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/CreateOrEdit`, invoiceData);
  }

  deleteInvoice(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/Delete?id=${id}`);
  }

  getInvoicesToExcel(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetInvoicesToExcel`);
  }

  getAllInvoicePlanForTableDropdown(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllInvoicePlanForTableDropdown`);
  }

  getAllCustomerForTableDropdown(): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetAllCustomerForTableDropdown`);
  }


}
