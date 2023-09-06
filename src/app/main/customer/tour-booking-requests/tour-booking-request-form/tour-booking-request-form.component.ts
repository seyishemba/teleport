import { Component, OnInit  } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormStateService } from './form-state.service';
import { FileSelectionService } from '@app/shared/services/file-selection-service/file-selection.service';
import { FileUploadService } from '@app/shared/services/file-upload-service/file-upload.service';

@Component({
    selector: 'app-tour-booking-request-form',
    templateUrl: './tour-booking-request-form.component.html',
    styleUrls: ['./tour-booking-request-form.component.css'],
})
export class TourBookingRequestFormComponent implements OnInit {
    dropDownTouched: any = {
        starBunkConfig: false,
        bandBunkConfig: false,
        crewBunkConfig: false,
        pickupLocation: false,
        dropoffLocation: false,
    };
    bookingRequest?: Partial<any>;
    // bookingRequest?:any;
    isEditBooking = false;

    // Booking forms
    FORMS = {
        generalInformation: 'general information',
        coaches: 'coaches',
        routingDetails: 'routing details',
        additionalData: 'additional data',
        summary: 'summary page',
    };

    currentForm = this.FORMS.generalInformation;

    infoForm: FormGroup;
    coachesForm: FormGroup;
    routingDetailsForm: FormGroup;
    additionalDataForm: FormGroup;

    // Drop down options for the bunk configs
    starBunkOptions: { label: string; value: any }[] = [
        { label: '4 bunks', value: 4 },
        { label: '5 bunks', value: 5 },
        { label: '6 bunks', value: 6 },
    ];

    crewBunkOptions: { label: string; value: any }[] = [
        { label: '8 bunks', value: 8 },
        { label: '9 bunks', value: 9 },
        { label: '10 bunks', value: 10 },
        { label: '11 bunks', value: 11 },
        { label: '12 bunks', value: 12 },
    ];

    bandBunkOptions: { label: string; value: any }[] = [
        { label: '8 bunks', value: 8 },
        { label: '9 bunks', value: 9 },
        { label: '10 bunks', value: 10 },
        { label: '11 bunks', value: 11 },
        { label: '12 bunks', value: 12 },
    ];

    // Media
    selectedFiles: File[] = [];
    imageUrls: { url: string; filetype: string }[] = [];

    constructor(
        // private bookingService: TourBookingRequestService,
        // private routeService: TourRoutesService,
        // private stopService: TourStopsService,
        private fb: FormBuilder,
        private formStateService: FormStateService,
        private fileSelectionService: FileSelectionService,
        private fileUploadService: FileUploadService,
        private location: Location,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.infoForm = this.fb.group({
            tourName: ['', [Validators.required]],
        });

        this.coachesForm = this.fb.group({
            starCoach: [false],
            numOfStarCoaches: [null, [Validators.min(0)]],
            starBunkConfig: [null, [Validators.min(0)]],
            bandCoach: [false],
            numOfBandCoaches: [null, [Validators.min(0)]],
            bandBunkConfig: [null, [Validators.min(0)]],
            crewCoach: [false],
            numOfCrewCoaches: [null, [Validators.min(0)]],
            crewBunkConfig: [null, [Validators.min(0)]],
        });

        this.routingDetailsForm = this.fb.group({
            pickup: this.fb.group({
                location: ['', Validators.required],
                date: ['', Validators.required],
                time: ['', Validators.required],
            }),
            stops: this.fb.array([]),
            dropoff: this.fb.group({
                location: ['', Validators.required],
                date: ['', Validators.required],
            }),
        });

        this.additionalDataForm = this.fb.group({
            comments: '',
            media: this.fb.array([]),
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe((params) => {
            if (params.get('id')) {
                const requestId = Number(params.get('id'));
                this.getTourBookingRequest(requestId);
                this.isEditBooking = true;
            }
        });
    }

    // Form controls
    onNext(): void {
        let formValue: Partial<any> = {}; // Define formValue as a partial TourBookingRequest

        switch (this.currentForm) {
            case this.FORMS.generalInformation:
                if (this.infoForm.valid) {
                    formValue = { ...this.infoForm.value };
                    this.currentForm = this.FORMS.coaches;
                    break;
                } else {
                    this.infoForm.get('tourName')?.markAsTouched();
                    return;
                }
            case this.FORMS.coaches:
                const coachesValues = this.coachesForm.value;
                if (
                    (coachesValues.starCoach && !coachesValues.starBunkConfig) ||
                    (coachesValues.bandCoach && !coachesValues.bandBunkConfig) ||
                    (coachesValues.crewCoach && !coachesValues.crewBunkConfig)
                ) {
                    this.dropDownTouched = {
                        ...this.dropDownTouched,
                        starBunkConfig: true,
                        bandBunkConfig: true,
                        crewBunkConfig: true,
                    };
                    this.coachesForm.markAllAsTouched();
                    return;
                } else {
                    formValue = {
                        ...coachesValues,
                        starCoach: Number(String(coachesValues.numOfStarCoaches).split(' ')[0]),
                        numOfBandCoaches: Number(String(coachesValues.numOfBandCoaches).split(' ')[0]),
                        numOfCrewCoaches: Number(String(coachesValues.numOfCrewCoaches).split(' ')[0]),
                    };

                    this.currentForm = this.FORMS.routingDetails;
                    break;
                }
            case this.FORMS.routingDetails:
                if (this.routingDetailsForm?.valid) {
                    formValue.route = { ...this.routingDetailsForm.value };

                    this.currentForm = this.FORMS.additionalData;
                    break;
                } else {
                    this.dropDownTouched = {
                        ...this.dropDownTouched,
                        pickupLocation: true,
                        dropoffLocation: true,
                    };
                    this.routingDetailsForm.markAllAsTouched();
                    return;
                }
            case this.FORMS.additionalData:
                formValue = { ...this.additionalDataForm.value };

                this.currentForm = this.FORMS.summary;
                break;
        }

        // this.formStateService.booking$.pipe(take(1)).subscribe((booking) => {
        //     this.bookingRequest = booking ? { ...booking, ...formValue } : { ...formValue };

        //     if (this.bookingRequest) {
        //         this.formStateService.updateFormState(this.bookingRequest);
        //     }

        //     console.log(this.bookingRequest);
        // });
    }

    onPrevious(): void {
        switch (this.currentForm) {
            case this.FORMS.coaches:
                this.currentForm = this.FORMS.generalInformation;
                break;
            case this.FORMS.routingDetails:
                this.currentForm = this.FORMS.coaches;
                break;
            case this.FORMS.additionalData:
                this.currentForm = this.FORMS.routingDetails;
                break;
            case this.FORMS.summary:
                this.currentForm = this.FORMS.additionalData;
                break;
        }
    }

    onSubmit(): void {
        /*  this.formStateService.booking$.pipe(take(1)).subscribe((booking) => {
            if (booking) {
                // Upload Files
                const mediaArray: string[] = [];

                if (this.selectedFiles.length > 0) {
                    this.fileUploadService.uploadFiles(this.selectedFiles).subscribe((urls) => {
                        console.log(urls);
                        urls.forEach((url: string) => {
                            mediaArray.push(url);
                        });

                        // merge tour object with additional data form values
                        const completeTourBookingData: any = {
                            ...booking,
                            ...this.additionalDataForm.value,
                            leasingAgentId: 1,
                            customerId: this.getUserId(),
                            media: mediaArray,
                        };
                        completeTourBookingData.status = TourBookingStatus.Submitted;

                        if (!this.isEditBooking) {
                            //create route
                            let route: TourRoute = { ...completeTourBookingData.route! };
                            if (route) {
                                this.routeService
                                    .create(route)
                                    .pipe(take(1))
                                    .subscribe((response) => {
                                        if (response && response.success) {
                                            route = response.data;
                                            completeTourBookingData.routeId = route.id;

                                            // create pickup stop
                                            // if (route.pickup) {
                                            //   this.stopService
                                            //     .create(route.pickup)
                                            //     .pipe(take(1))
                                            //     .subscribe((response) => {
                                            //       if (response && response.success) {
                                            //         route.pickUpId = response.data.id;
                                            //         route.pickup = undefined;
                                            //       }
                                            //     });
                                            // }

                                            // // create dropoff stop
                                            // if (route.dropoff) {
                                            //   this.stopService
                                            //     .create(route.dropoff)
                                            //     .pipe(take(1))
                                            //     .subscribe((response) => {
                                            //       if (response && response.success) {
                                            //         route.dropOffId = response.data.id;
                                            //         route.dropoff = undefined;
                                            //       }
                                            //     });
                                            // }

                                            // create stops for the route
                                            route.stops.push(route?.dropoff!);
                                            route.stops.push(route?.pickup!);
                                            if (route.stops && route.stops.length > 0) {
                                                route.stops.forEach((tourRoute) => {
                                                    tourRoute.tourRouteId = route.id;
                                                });
                                                console.log(route.stops);
                                                this.stopService
                                                    .createMultiple(route.stops)
                                                    .pipe(take(1))
                                                    .subscribe((response) => {
                                                        if (response && response.success) {
                                                            console.log(response.data);
                                                        }
                                                    });
                                            }
                                            if (completeTourBookingData.route) {
                                                completeTourBookingData.route.pickUpId = undefined;
                                                completeTourBookingData.route.pickup = undefined;
                                                completeTourBookingData.route.dropOffId = undefined;
                                                completeTourBookingData.route.dropoff = undefined;
                                                completeTourBookingData.route.stops = [];
                                            }
                                            this.bookingService
                                                .create(completeTourBookingData)
                                                .pipe(take(1))
                                                .subscribe((response) => {
                                                    if (response && response.success) {
                                                        console.log(response);
                                                        console.log('first aaaabdc');
                                                        // this.router.navigateByUrl(
                                                        //   'client/booking-requests'
                                                        // );
                                                    }
                                                });
                                            // this.router.navigateByUrl('client/booking-requests');
                                        }
                                    });
                            }
                        } else {
                            console.log('is updating');
                            this.bookingService
                                .update(this.bookingRequest?.id, completeTourBookingData)
                                .pipe(take(1))
                                .subscribe((response) => {
                                    if (response && response.success) {
                                        this.router.navigateByUrl(
                                            `/client/booking-requests/${this.bookingRequest?.id}`
                                        );
                                    }
                                });
                        }
                        this.formStateService.clearFormState();

                        // Clear the file selection and perform any necessary actions
                        this.selectedFiles = [];
                    });
                } else {
                    // merge tour object with additional data form values
                    const completeTourBookingData: any = {
                        ...booking,
                        ...this.additionalDataForm.value,
                        leasingAgentId: 1,
                        customerId: this.getUserId(),
                        media: mediaArray,
                    };
                    completeTourBookingData.status = TourBookingStatus.Submitted;
                    console.log(completeTourBookingData);
                    if (!this.isEditBooking) {
                        //create route
                        let route: TourRoute = { ...completeTourBookingData.route! };
                        if (route) {
                            this.routeService
                                .create(route)
                                .pipe(take(1))
                                .subscribe((response) => {
                                    if (response && response.success) {
                                        route = response.data;
                                        completeTourBookingData.routeId = route.id;

                                        // // create pickup stop
                                        // if (route.pickup) {
                                        //   this.stopService
                                        //     .create(route.pickup)
                                        //     .pipe(take(1))
                                        //     .subscribe((response) => {
                                        //       if (response && response.success) {
                                        //         route.pickUpId = response.data.id;
                                        //         route.pickup = undefined;
                                        //       }
                                        //     });
                                        // }

                                        // // create dropoff stop
                                        // if (route.dropoff) {
                                        //   this.stopService
                                        //     .create(route.dropoff)
                                        //     .pipe(take(1))
                                        //     .subscribe((response) => {
                                        //       if (response && response.success) {
                                        //         route.dropOffId = response.data.id;
                                        //         route.dropoff = undefined;
                                        //       }
                                        //     });
                                        // }

                                        // create stops for the route
                                        route.stops.push(route.pickup!);
                                        route.stops.push(route.dropoff!);
                                        console.log('alsdfkjalsdfjkasdlfjasdf: ', route.stops);
                                        if (route.stops && route.stops.length > 0) {
                                            route.stops.forEach((stop) => {
                                                stop.tourRouteId = route.id;
                                            });
                                            this.stopService
                                                .createMultiple(route.stops)
                                                .pipe(take(1))
                                                .subscribe((response) => {
                                                    if (response && response.success) {
                                                    }
                                                });
                                        }
                                        if (completeTourBookingData.route) {
                                            completeTourBookingData.route.pickUpId = undefined;
                                            completeTourBookingData.route.pickup = undefined;
                                            completeTourBookingData.route.dropOffId = undefined;
                                            completeTourBookingData.route.dropoff = undefined;
                                            completeTourBookingData.route.stops = [];
                                        }
                                        this.bookingService
                                            .create(completeTourBookingData)
                                            .pipe(take(1))
                                            .subscribe((response) => {
                                                if (response && response.success) {
                                                    console.log(response);
                                                    console.log('second addakls;a');
                                                    // this.router.navigateByUrl('client/booking-requests');
                                                }
                                            });
                                        // this.router.navigateByUrl('client/booking-requests');
                                    }
                                });
                        }
                    } else {
                        console.log('is updating');
                        this.bookingService
                            .update(this.bookingRequest?.id, completeTourBookingData)
                            .pipe(take(1))
                            .subscribe((response) => {
                                if (response && response.success) {
                                    this.router.navigateByUrl(`/client/booking-requests/${this.bookingRequest?.id}`);
                                }
                            });
                    }
                    this.formStateService.clearFormState();

                    // Clear the file selection and perform any necessary actions
                    this.selectedFiles = [];
                }
            }
        });*/
    }

    // Various form event handlers
    onAddMedia(event: any): void {
        if (event.target.files.length > 0) {
            const files: File[] = event.target.files;
            Array.from(files).forEach((file) => {
                this.fileSelectionService.addSelectedFile(file);
                this.selectedFiles.push(file);

                const url = URL.createObjectURL(file);
                this.imageUrls.push({ url: url, filetype: file.type });
            });
        }
    }

    onRemoveMedia(file: File): void {
        this.fileSelectionService.removeSelectedFile(file);
    }

    onAddStop() {
        this.stopsFormArray.push(
            this.fb.group({
                location: [''],
                date: [''],
            })
        );
    }

    onRemoveStop(index: number) {
        this.stopsFormArray.removeAt(index);
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    get stopsFormArray(): FormArray {
        return this.routingDetailsForm.get('stops') as FormArray;
    }

    onCancelRequest() {
        (this.location as any).back();
    }

    getUserId() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user).id : null;
    }

    getTourBookingRequest(id: any): void {
        /* try {
            this.bookingService
                .getOne(id)
                .pipe(take(1))
                .subscribe((response) => {
                    if (response && response.success) {
                        this.bookingRequest = response.data;
                        this.infoForm.patchValue({
                            tourName: this.bookingRequest.tourName,
                        });
                        this.coachesForm.patchValue({
                            starCoach: this.bookingRequest.starCoach,
                            numOfStarCoaches: this.bookingRequest.numOfStarCoaches,
                            starBunkConfig: this.bookingRequest.starBunkConfig,
                            bandCoach: this.bookingRequest.bandCoach,
                            numOfBandCoaches: this.bookingRequest.numOfBandCoaches,
                            bandBunkConfig: this.bookingRequest.bandBunkConfig,
                            crewCoach: this.bookingRequest.crewCoach,
                            numOfCrewCoaches: this.bookingRequest.numOfCrewCoaches,
                            crewBunkConfig: this.bookingRequest.crewBunkConfig,
                            numOfTrailers: this.bookingRequest.numOfTrailers,
                        });
                        this.routingDetailsForm.patchValue({
                            stops: this.bookingRequest.route?.stops,
                            pickup: this.bookingRequest.route?.pickup,
                            dropoff: this.bookingRequest.route?.dropoff,
                        });
                        this.additionalDataForm.patchValue({
                            comments: this.bookingRequest.comments,
                            media: this.bookingRequest.media,
                        });
                    }
                });
        } catch (error) {
            console.log(error);
        }*/
    }

    checkifFileIsPdf(file: any) {
        return file.filetype.split('/')[1].toLowerCase() === 'pdf';
    }

    onBlur(value: string) {
        this.dropDownTouched = { ...this.dropDownTouched, [value]: true };
    }

    onRemoveFile(file: any): void {
        const fileIndex = this.selectedFiles.findIndex((media) => media.name === file.name);
        this.selectedFiles.splice(fileIndex, 1);
    }
}
