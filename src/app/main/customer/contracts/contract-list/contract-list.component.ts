import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { environment } from 'environments/environment';
import { TableColumn } from 'pilgrim-ng-ui-library';

@Component({
    selector: 'app-contract-list',
    templateUrl: './contract-list.component.html',
    styleUrls: ['./contract-list.component.css'],
})
export class ContractListComponent implements OnInit {
    // apiEndpoint = environment.apiUrl;
    isModalOpen = false;
    filterPillsList: string[] = [];
    dropDownSortingList: string[] = ['Contract Status', 'Date'];
    tableColumns: TableColumn[] = [
        {
            key: 'pinned',
            title: 'Pinned',
        },
        {
            key: 'tour.name',
            title: 'Tour Name',
            render: (value: any, record: any) => record?.tourRequest?.tourName,
        },
        {
            key: 'tour.date',
            title: 'Tour Date',
            render: (value: any, record: any) => record?.tourRequest?.route?.pickup?.date,
        },
        {
            key: 'coach.name',
            title: 'Coaches',
            // render: (value: any, record: any) =>
            //   record?.tourRequest?.coachOptions[0]?.coach?.name,
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
    contractList: any[] = [];

    // private coachAssignmentService: CoachAssignmentService,
    // private http: HttpClient
    constructor(
        private route: ActivatedRoute,
        private router: Router // private contractsService: ContractService,
    ) {}

    ngOnInit(): void {
        // this.getAllContracts();
    }

    // getAllContracts(): void {
    //   this.contractsService
    //     .getAll()
    //     .pipe(
    //       take(1),
    //       switchMap((response: ReturnObject<Contract[]>) => {
    //         if (response && response.success) {
    //           const contracts: Contract[] = [];
    //           const requests: Observable<any>[] = [];

    //           for (const contract of response.data) {
    //             const tourBookingRequest = this.http
    //               .get<ReturnObject<TourBooking>>(
    //                 `${this.apiEndpoint}tour-bookings/${contract.tourId}`
    //               )
    //               .pipe(
    //                 switchMap((data) => {
    //                   const tourBooking = data.data;
    //                   console.log(tourBooking);
    //                   const innerRequests: Observable<any>[] = [];

    //                   innerRequests.push(
    //                     this.coachAssignmentService
    //                       .getAllByParams('tourBookingId', tourBooking.id)
    //                       .pipe(
    //                         switchMap(
    //                           (
    //                             coachAssignmentResponse: ReturnObject<
    //                               CoachAssignment[]
    //                             >
    //                           ) => {
    //                             const coachAssignments =
    //                               coachAssignmentResponse.data;
    //                             console.log(coachAssignments);
    //                             const innerRequests: Observable<any>[] = [];

    //                             for (const coachAssignment of coachAssignments) {
    //                               if (coachAssignment.coachId) {
    //                                 innerRequests.push(
    //                                   this.http
    //                                     .get<ReturnObject<Coach>>(
    //                                       `${this.apiEndpoint}coaches/${coachAssignment.coachId}`
    //                                     )
    //                                     .pipe(
    //                                       switchMap((coachResponse) => {
    //                                         let coach = coachResponse.data;
    //                                         return this.http
    //                                           .get<ReturnObject<Vehicle>>(
    //                                             `${this.apiEndpoint}vehicles/${coach.vehicleId}`
    //                                           )
    //                                           .pipe(
    //                                             map((vehicleResponse) => {
    //                                               const vehicle =
    //                                                 vehicleResponse.data;
    //                                               coach = {
    //                                                 ...vehicle,
    //                                                 ...coach,
    //                                               };
    //                                               coachAssignment.coach = coach;
    //                                               return null;
    //                                             })
    //                                           );
    //                                       })
    //                                     )
    //                                 );
    //                               }
    //                             }

    //                             return forkJoin(innerRequests).pipe(
    //                               map(() => {
    //                                 tourBooking.coachAssignments =
    //                                   coachAssignments;
    //                                 return null;
    //                               })
    //                             );
    //                           }
    //                         )
    //                       )
    //                   );

    //                   return forkJoin(innerRequests).pipe(
    //                     map(() => {
    //                       console.log(tourBooking);
    //                       contract.tour = tourBooking;
    //                       contracts.push(contract);
    //                       return null;
    //                     })
    //                   );
    //                 })
    //               );

    //             requests.push(tourBookingRequest);
    //           }

    //           return forkJoin(requests).pipe(
    //             map(() => {
    //               response.data = contracts;
    //               return response;
    //             })
    //           );
    //         } else {
    //           return of(response);
    //         }
    //       })
    //     )
    //     .subscribe((response) => {
    //       if (response && response.success) {
    //         console.log(response.data);
    //         this.contractList = response.data;
    //       }
    //     });
    // }

    onOpenAddContractModal() {
        this.isModalOpen = true;
    }

    onCloseModal() {
        this.isModalOpen = false;
    }

    onAddFilterPill(filterText: string): void {
        this.filterPillsList.push(filterText);
    }

    onRemoveFilterPill(pillIndex: number): void {
        this.filterPillsList.splice(pillIndex, 1);
    }

    onRowClick(row: any): void {
        const id = row.id;
        this.router.navigate([id], { relativeTo: this.route });
    }
}
