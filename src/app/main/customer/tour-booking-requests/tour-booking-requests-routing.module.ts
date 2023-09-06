import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourBookingRequestsListComponent } from './tour-booking-requests-list/tour-booking-requests-list.component';
import { TourBookingRequestDetailsComponent } from './tour-booking-request/tour-booking-request-details.component';
import { TourBookingRequestFormComponent } from './tour-booking-request-form/tour-booking-request-form.component';

const routes: Routes = [
    {
        path: '',
        component: TourBookingRequestsListComponent,
        pathMatch: 'full',
    },
    {
        path: 'booking-request-form',
        component: TourBookingRequestFormComponent,
        data: { permission: null },
    },
    {
        path: 'booking-request-form/:id',
        component: TourBookingRequestFormComponent,
        data: { permission: null },
    },
    {
        path: ':id',
        component: TourBookingRequestDetailsComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ToursRoutingModule {}
