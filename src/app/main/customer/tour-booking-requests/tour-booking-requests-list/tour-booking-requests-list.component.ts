import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { take, switchMap, forkJoin, map } from 'rxjs';

@Component({
    selector: 'app-tour-booking-requests-list',
    templateUrl: './tour-booking-requests-list.component.html',
    styleUrls: ['./tour-booking-requests-list.component.css'],
})
export class TourBookingRequestsListComponent implements OnInit {
    // Bookings
    filterPillsList: string[] = [];
    dropDownSortingList: string[] = [];
    // TourBookingRequest
    bookings: any[] = [];
    booking?: any;

    tableColumns: TableColumn[] = [
        { title: 'TourBooking Name', key: 'tourName' },
        {
            title: 'Start Date',
            key: 'route.pickup.date',
            render: (value: any, record: any) => record.route?.pickup?.date,
        },
        {
            title: 'End Date',
            key: 'route.dropoff.date',
            render: (value: any, record: any) => record.route?.dropoff?.date,
        },
        {
            title: 'Pickup Location',
            key: 'route.pickup.location',
            render: (value: any, record: any) => record.route?.pickup?.location,
        },
        {
            title: 'Drop-off Location',
            key: 'route.dropoff.location',
            render: (value: any, record: any) => record.route?.dropoff?.location,
        },
        {
            title: 'Status',
            key: 'status',
            render: (value: any, record: any) => record.status,
        },
        {
            title: '',
            key: 'view',
        },
    ];

    constructor(
        //  private bookingService: TourBookingRequestService,
        // private routeStopsService: TourStopsService
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getAllBookings();
    }

    getAllBookings() {
        /* this.bookingService
            .getAll()
            .pipe(
                take(1),
                switchMap((response) => {
                    if (response && response.success) {
                        return forkJoin(
                            response.data.map((booking) => {
                                return this.routeStopsService.getAllByParams('tourRouteId', booking.routeId).pipe(
                                    take(1),
                                    map((routeResponse) => ({ booking, routeResponse }))
                                );
                            })
                        );
                    } else {
                        return [];
                    }
                })
            )
            .subscribe((bookingRoutePairs) => {
                bookingRoutePairs.forEach(({ booking, routeResponse }) => {
                    if (routeResponse && routeResponse.success) {
                        const sortedStops = this.sortStopsByDateAscending(routeResponse.data);
                        if (booking.route) {
                            booking.route.pickup = sortedStops[0];
                            booking.route.dropoff = sortedStops.slice(-1)[0];
                            booking.route.stops = sortedStops;
                        }
                    }
                });
                // All inner requests completed, now update the state
                this.bookings = bookingRoutePairs.map(({ booking }) => booking);
                console.log(this.bookingService);
                // Perform any further operations here with this.bookings
            });*/
    }

    onAddFilterPill(filterText: string): void {
        this.filterPillsList.push(filterText);
        this.onSearchTable(''); // Trigger the table filter after adding a new filter pill
    }

    onRemoveFilterPill(pillIndex: number): void {
        this.filterPillsList.splice(pillIndex, 1);
        this.onSearchTable(''); // Trigger the table filter after removing a filter pill
    }

    onAddEntity() {
        this.router.navigate(['booking-request-form'], { relativeTo: this.route.parent });
    }

    onSearchTable(event: string) {
        let searchTerm = event.toLowerCase();
        let filterPillsList = this.filterPillsList;

        if (!searchTerm && filterPillsList.length === 0) {
            this.getAllBookings(); //if search term and filter pills list are empty, reset to original data.
        } else {
            this.bookings.filter(
                (booking) =>
                    this.objectContainsTerm(booking, searchTerm) &&
                    this.objectContainsAllPills(booking, filterPillsList)
            );
        }
    }

    objectContainsTerm(object: any, term: string): boolean {
        return Object.values(object).some((value) => value?.toString().toLowerCase().includes(term));
    }

    objectContainsAllPills(object: any, pills: string[]): boolean {
        return pills.every((pill) =>
            Object.values(object).some((value) => value?.toString().toLowerCase().includes(pill.toLowerCase()))
        );
    }

    onViewClick(event: any): void {
        this.router.navigate([event['id']], { relativeTo: this.route });
    }

    sortStopsByDateAscending(datesArray: any[]): any[] {
        // Create a custom comparison function to sort the dates
        const compareDates = (stop1: any, stop2: any) =>
            new Date(stop1?.date).getTime() - new Date(stop2?.date).getTime();

        // Use the sort() method with the custom comparison function
        datesArray.sort(compareDates);

        return datesArray;
    }
}
