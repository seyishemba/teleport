import {Component, Injector, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableColumn } from 'pilgrim-ng-ui-library';
import { take } from 'rxjs';
import {AppComponent} from '@app/app.component';

@Component({
    selector: 'app-tour',
    templateUrl: './tour.component.html',
    styleUrls: ['./tour.component.css'],
})
export class TourComponent extends AppComponent implements OnInit {
    tourBooking?: any;
    tourBookingId?: number;
    coachAssignments: any[] = [];

    numOfLoadedRelatedData = 0;
    isLoading = true;

    totalCostOfTour = '';

    driverTableColumns: TableColumn[] = [
        {
            title: 'Coach Type',
            key: 'type',
            render: (value: any, record: any) => record?.coach?.type,
        },
        {
            title: 'Coach Name',
            key: 'name',
            render: (value: any, record: any) => record?.coach?.name,
        },
        {
            title: 'Bunk Config',
            key: 'bunkConfiguration',
            render: (value: any, record: any) => record?.coach?.bunkConfiguration,
        },
        {
            title: 'Trailer',
            key: 'name',
            render: (value: any, record: any) => record?.trailer?.name,
        },
        {
            title: 'Driver',
            key: 'primaryDriver',
            // render: (value: any, record: any) =>
            //   record?.primaryDriver?.name,
        },
        {
            title: 'Co-Driver',
            key: 'coDriver',
            // render: (value: any, record: any) => record?.coDriver?.name,
        },
    ];

    constructor(
        private injector: Injector,
        // private bookingService: anyService,
        // private coachAssignmentService: CoachAssignmentService,
        // private coachService: CoachesService,
        // private vehicleService: VehicleService,
        // private trailerService: TrailerService,
        // private userService: UserService,
        // private driverService: DriversService,
        // private contractService: ContractService,
        // private quoteService: QuotesService,
        // private bidService: BidService,
        // private routeService: TourRoutesService,
        // private stopService: TourStopsService,
        private route: ActivatedRoute
    ) {
     super(injector, null, null, null);
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            this.tourBookingId = Number(params.get('id'));

            this.getTour();
        });
    }

    getTour(): void {
        /*  try {
            // get booking
            this.bookingService
                .getOne(this.tourBookingId)
                .pipe(take(1))
                .subscribe((response) => {
                    if (response) {
                        if (response.success && response.data) {
                            this.tourBooking = response.data;

                            // get assignments
                            this.coachAssignmentService
                                .getAllByParams('tourBookingId', this.tourBookingId)
                                .pipe(take(1))
                                .subscribe((response) => {
                                    if (response && response.success) {
                                        this.coachAssignments = response.data;

                                        if (this.coachAssignments.length > 0) {
                                            this.coachAssignments.forEach((assignment) => {
                                                // get coach
                                                this.coachService
                                                    .getOne(assignment.coachId)
                                                    .pipe(take(1))
                                                    .subscribe((response) => {
                                                        if (response && response.success) {
                                                            const coach = response.data;

                                                            const vehicleId = coach.vehicleId;
                                                            if (vehicleId) {
                                                                this.vehicleService
                                                                    .getOne(vehicleId)
                                                                    .pipe(take(1))
                                                                    .subscribe((response) => {
                                                                        if (response && response.success) {
                                                                            assignment.coach = {
                                                                                ...coach,
                                                                                ...response.data,
                                                                            };
                                                                        }
                                                                    });
                                                            }
                                                        }
                                                    });

                                                // get trailer
                                                this.trailerService
                                                    .getOne(assignment.trailerId)
                                                    .pipe(take(1))
                                                    .subscribe((response) => {
                                                        if (response && response.success) {
                                                            const trailer = response.data;

                                                            const vehicleId = trailer.vehicleId;
                                                            if (vehicleId) {
                                                                this.vehicleService
                                                                    .getOne(vehicleId)
                                                                    .pipe(take(1))
                                                                    .subscribe((response) => {
                                                                        if (response && response.success) {
                                                                            assignment.trailer = {
                                                                                ...trailer,
                                                                                ...response.data,
                                                                            };
                                                                        }
                                                                    });
                                                            }
                                                        }
                                                    });

                                                // get driver
                                                this.driverService
                                                    .getOne(assignment.primaryDriverId)
                                                    .pipe(take(1))
                                                    .subscribe((response) => {
                                                        if (response && response.success) {
                                                            const driver = response.data;

                                                            const userId = driver.userId;
                                                            if (userId) {
                                                                this.userService
                                                                    .getOne(userId)
                                                                    .pipe(take(1))
                                                                    .subscribe((response) => {
                                                                        if (response && response.success) {
                                                                            assignment.primaryDriver = {
                                                                                ...driver,
                                                                                ...response.data,
                                                                            };
                                                                        }
                                                                    });
                                                            }
                                                        }
                                                    });

                                                this.isLoading = false;
                                            });
                                        }
                                    }
                                });

                            // get contract
                            this.contractService
                                .getOneByParams('tourId', this.tourBookingId)
                                .pipe(take(1))
                                .subscribe((response) => {
                                    if (response && response.success) {
                                        this.tourBooking!.contract = response.data[0];
                                    }
                                });

                            // get quote
                            this.quoteService
                                .getOne(this.tourBooking.quoteId)
                                .pipe(take(1))
                                .subscribe((response) => {
                                    if (response && response.success) {
                                        let quote = response.data;

                                        const bidId = quote.bidId;
                                        if (bidId) {
                                            this.bidService
                                                .getOne(bidId)
                                                .pipe(take(1))
                                                .subscribe((response) => {
                                                    if (response && response.success) {
                                                        let bid = response.data;

                                                        this.bidService
                                                            .getAllBidItemsByBid('bidId', bid.id)
                                                            .pipe(take(1))
                                                            .subscribe((response) => {
                                                                if (response && response.success) {
                                                                    let bidItems = response.data;

                                                                    bid = { ...bid, bidItems: [...bidItems] };

                                                                    quote = { ...quote, bid: { ...bid } };

                                                                    let total = 0;
                                                                    quote.bid.bidItems.forEach((bidItem) => {
                                                                        total += bidItem.total;
                                                                    });

                                                                    this.totalCostOfTour = Number(total).toLocaleString(
                                                                        'en-US',
                                                                        {
                                                                            style: 'currency',
                                                                            currency: 'USD',
                                                                            minimumFractionDigits: 2,
                                                                            maximumFractionDigits: 2,
                                                                        }
                                                                    );
                                                                }
                                                            });
                                                    }
                                                });
                                        }
                                    }
                                });

                            // get route
                            this.routeService
                                .getOne(this.tourBooking.routeId)
                                .pipe(take(1))
                                .subscribe((response) => {
                                    if (response && response.success) {
                                        let route: TourRoute = response.data;

                                        const pickUpId = route.pickUpId;
                                        if (pickUpId) {
                                            this.stopService
                                                .getOne(pickUpId)
                                                .pipe(take(1))
                                                .subscribe((response) => {
                                                    if (response && response.success) {
                                                        route.pickup = response.data;
                                                    }
                                                });
                                        }

                                        const dropOffId = route.dropOffId;
                                        if (dropOffId) {
                                            this.stopService
                                                .getOne(dropOffId)
                                                .pipe(take(1))
                                                .subscribe((response) => {
                                                    if (response && response.success) {
                                                        route.dropoff = response.data;
                                                    }
                                                });
                                        }

                                        const tourRouteId = route.id;
                                        if (tourRouteId) {
                                            this.stopService
                                                .getAllByParams('tourRouteId', tourRouteId)
                                                .pipe(take(1))
                                                .subscribe((response) => {
                                                    if (response && response.success) {
                                                        route.stops = response.data;
                                                    }
                                                });
                                        }

                                        this.tourBooking!.route = route;
                                    }
                                });
                        }
                    }
                });
        } catch (error) {
            console.log(error);
        }*/
    }

    getFileNameFromUrl(url: string): string {
        const parts = url.split('/');
        return parts[parts.length - 1];
    }
}
