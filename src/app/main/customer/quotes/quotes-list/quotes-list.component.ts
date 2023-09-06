import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { TableColumn } from 'pilgrim-ng-ui-library';

@Component({
    selector: 'app-quotes-list',
    templateUrl: './quotes-list.component.html',
    styleUrls: ['./quotes-list.component.css'],
})
export class QuotesListComponent implements OnInit {
    selectedanyId?: number;
    // apiEndpoint = environment.apiUrl;
    filterPillsList: string[] = [];
    dropDownSortingList: string[] = ['Status', 'Date', 'TourBooking Date', 'Amount'];
    quotesList: any[] = [];
    isModalOpen = false;
    isAddany = false;
    tableColumns: TableColumn[] = [
        {
            key: 'tourName',
            title: 'Tour',
            render: (value: any, record: any) => record?.bookingRequest?.tourName,
        },
        // {
        //   key:"date",
        //   title:"Date"
        // },
        // {
        //   key:"customerName",
        //   title:"Customer Name",
        //   render:(value:any,record:any) => record?.bookingRequest?.customer?.name
        // },
        {
            key: 'tourDate',
            title: 'Date',
            render: (value: any, record: any) => record?.bookingRequest?.route?.pickup?.date,
        },
        {
            key: 'destination',
            title: 'Destination',
            render: (value: any, record: any) => record?.bookingRequest?.route?.dropoff?.location,
        },
        {
            key: 'amount',
            title: 'Amount',
        },
        {
            key: 'status',
            title: 'Status',
        },
        {
            key: 'view',
            title: '',
        },
    ];

    // private quotesService: anysService,
    // private http: HttpClient
    constructor(private router: Router, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.getAllanys();
    }

    getAllanys(): void {
        // this.quotesService
        //     .getAll()
        //     .pipe(
        //         take(1),
        //         switchMap((response: ReturnObject<any[]>) => {
        //             if (response && response.success) {
        //                 const quotes: any[] = [];
        //                 const requests: Observable<any>[] = response.data.map((quote: any) => {
        //                     const tourBookingRequest = this.http
        //                         .get<ReturnObject<TourBookingRequest>>(
        //                             `${this.apiEndpoint}tour-booking-requests/${quote.bookingRequestId}`
        //                         )
        //                         .pipe(
        //                             mergeMap((tourBookingResponse) => {
        //                                 console.log(tourBookingResponse);
        //                                 const tourBooking = tourBookingResponse.data;
        //                                 const customerRequest = this.http
        //                                     .get<ReturnObject<Customer>>(
        //                                         `${this.apiEndpoint}customers/${tourBooking.customerId}`
        //                                     )
        //                                     .pipe(
        //                                         switchMap((customerResponse) => {
        //                                             const customer = customerResponse.data;
        //                                             return this.http
        //                                                 .get<ReturnObject<User>>(
        //                                                     `${this.apiEndpoint}users/${tourBooking.customerId}`
        //                                                 )
        //                                                 .pipe(
        //                                                     map((userResponse) => {
        //                                                         const user = userResponse.data;
        //                                                         tourBooking.customer = { ...user, ...customer };
        //                                                         quote.bookingRequest = tourBooking;
        //                                                         return quote;
        //                                                     })
        //                                                 );
        //                                         })
        //                                     );
        //                                 return customerRequest;
        //                             })
        //                         );
        //                     return tourBookingRequest;
        //                 });
        //                 return forkJoin(requests).pipe(
        //                     map((quotesWithRelatedData) => {
        //                         response.data = quotesWithRelatedData; // Update the response with the quotes array containing related data
        //                         return response;
        //                     })
        //                 );
        //             } else {
        //                 return of(response); // Return the original response if it's not successful
        //             }
        //         })
        //     )
        //     .subscribe((response) => {
        //         this.quotesList = response.data;
        //     });
    }

    onAddFilterPill(filterText: string): void {
        this.filterPillsList.push(filterText);
    }

    onRemoveFilterPill(pillIndex: number): void {
        this.filterPillsList.splice(pillIndex, 1);
    }

    openModal(event: any): void {
        this.isModalOpen = true;
        this.selectedanyId = event['id'];
        console.log(this.selectedanyId);
    }

    closeModal(): void {
        this.isModalOpen = false;
    }

    onViewDetail(row: any) {
        console.log(row);
        const id = row.id;
        if (row.status === 'Pending') {
            this.router.navigateByUrl(`/client/pending-quotes/${id}`);
        } else {
            this.router.navigate([id], { relativeTo: this.route });
        }
    }

    formatMoney(value: any) {
        return value?.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
    }
}
