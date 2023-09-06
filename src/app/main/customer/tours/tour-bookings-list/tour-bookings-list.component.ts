import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { take, switchMap, Observable, map, forkJoin, of } from 'rxjs';

@Component({
    selector: 'app-tour-bookings-list',
    templateUrl: './tour-bookings-list.component.html',
    styleUrls: ['./tour-bookings-list.component.css'],
})
export class TourBookingsListComponent implements OnInit {
    // apiEndpoint = environment.apiUrl;

    // Tours
    filterPillsList: string[] = [];
    dropDownSortingList: string[] = ['Status', 'Date', 'Some other'];
    tours: any[] = [];
    tour?: any;

    tableColumns: TableColumn[] = [
        { title: 'Pinned', key: 'pinned' },
        { title: 'Tour Name', key: 'name' },
        {
            title: 'Bus Name',
            key: 'coach',
            render: (value: any, record: any) => record?.coachAssignments[0]?.coach?.name,
        },
        {
            title: 'Tour Dates',
            key: 'date',
            render: (value: any, record: any) =>
                `${String(record?.route?.pickup?.date)?.split('-').slice(1).join('/')} - ${String(
                    record?.route?.dropoff?.date
                )
                    .split('-')
                    .slice(1)
                    .join('/')}`,
        },
        {
            title: 'Primary Driver',
            key: 'primaryDriver',
        },
        {
            title: 'Co-Driver',
            key: 'coDriver',
        },
        {
            title: 'Contract Status',
            key: 'contract.status',
            render: (value: any, record: any) => record?.contract?.status,
        },
        // { title: 'TourBooking Status', key: 'status' },

        {
            title: '',
            key: 'view',
        },
    ];

    constructor(
        // private toursService: TourBookingService,
        // private contractService: ContractService,
        // private coachAssignmentService: CoachAssignmentService,
        // private tourRoutesService: TourRoutesService,
        // private tourStopsService: TourStopsService,
        // private http: HttpClient,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.getAllTours();
    }

    getAllTours(): void {
        /* this.toursService
            .getAll()
            .pipe(
                take(1),
                switchMap((response: ReturnObject<TourBooking[]>) => {
                    if (response && response.success) {
                        const tours: TourBooking[] = [];
                        const requests: Observable<any>[] = [];

                        for (const tour of response.data) {
                            requests.push(
                                this.contractService.getAll().pipe(
                                    map((contractResponse) => {
                                        tour.contract = contractResponse.data.find(
                                            (contract) => contract.id === tour.contractId
                                        )!;
                                        return null;
                                    })
                                )
                            );

                            requests.push(
                                this.coachAssignmentService.getAllByParams('tourBookingId', tour.id).pipe(
                                    switchMap((coachAssignmentResponse: ReturnObject<CoachAssignment[]>) => {
                                        const coachAssignments = coachAssignmentResponse.data;
                                        const innerRequests: Observable<any>[] = [];

                                        for (const coachAssignment of coachAssignments) {
                                            if (coachAssignment.primaryDriverId) {
                                                innerRequests.push(
                                                    this.http
                                                        .get<ReturnObject<Driver>>(
                                                            `${this.apiEndpoint}users/${coachAssignment.primaryDriverId}`
                                                        )
                                                        .pipe(
                                                            map((driverResponse) => {
                                                                coachAssignment.primaryDriver = driverResponse.data;
                                                                return null;
                                                            })
                                                        )
                                                );
                                            }

                                            if (coachAssignment.coachId) {
                                                innerRequests.push(
                                                    this.http
                                                        .get<ReturnObject<Coach>>(
                                                            `${this.apiEndpoint}coaches/${coachAssignment.coachId}`
                                                        )
                                                        .pipe(
                                                            switchMap((coachResponse) => {
                                                                let coach = coachResponse.data;
                                                                return this.http
                                                                    .get<ReturnObject<Vehicle>>(
                                                                        `${this.apiEndpoint}vehicles/${coach.vehicleId}`
                                                                    )
                                                                    .pipe(
                                                                        map((vehicleResponse) => {
                                                                            const vehicle = vehicleResponse.data;
                                                                            coach = { ...vehicle, ...coach };
                                                                            coachAssignment.coach = coach;
                                                                            return null;
                                                                        })
                                                                    );
                                                            })
                                                        )
                                                );
                                            }
                                        }

                                        return forkJoin(innerRequests).pipe(
                                            map(() => {
                                                tour.coachAssignments = coachAssignments;
                                                return null;
                                            })
                                        );
                                    })
                                )
                            );

                            if (tour.routeId) {
                                requests.push(
                                    this.tourRoutesService.getOne(tour.routeId).pipe(
                                        switchMap((routeResponse) => {
                                            const route = routeResponse.data;

                                            const pickupRequest = this.tourStopsService.getOne(route.pickUpId);
                                            const dropOffRequest = this.tourStopsService.getOne(route.dropOffId);
                                            const stopsRequest = this.tourStopsService.getAllByParams(
                                                'tourRouteId',
                                                tour.routeId
                                            );

                                            return forkJoin([pickupRequest, dropOffRequest, stopsRequest]).pipe(
                                                map(([pickupResponse, dropOffResponse, stopsResponse]) => {
                                                    route.pickup = pickupResponse.data;
                                                    route.dropoff = dropOffResponse.data;
                                                    route.stops = stopsResponse.data;

                                                    tour.route = route;
                                                    return null;
                                                })
                                            );
                                        }),
                                        take(1)
                                    )
                                );
                            }

                            tours.push(tour);
                        }

                        return forkJoin(requests).pipe(
                            map(() => {
                                response.data = tours;
                                return response;
                            })
                        );
                    } else {
                        return of(response);
                    }
                })
            )
            .subscribe((response) => {
                if (response) {
                    console.log(response);
                    this.tours = response.data;
                }
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
        this.router.navigateByUrl('/client/booking-request-form');
    }

    onSearchTable(event: string) {
        let searchTerm = event.toLowerCase();
        let filterPillsList = this.filterPillsList;

        if (!searchTerm && filterPillsList.length === 0) {
            this.getAllTours(); //if search term and filter pills list are empty, reset to original data.
        } else {
            this.tours.filter(
                (tour) =>
                    this.objectContainsTerm(tour, searchTerm) && this.objectContainsAllPills(tour, filterPillsList)
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

    onRowClick(row: any): void {
        this.router.navigate([row.id], { relativeTo: this.route });
    }
}
