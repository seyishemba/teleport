import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MainPageModule } from '@shared/components/main-page/main-page.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { TourBookingRequestDetailsComponent } from './tour-booking-request/tour-booking-request-details.component';
import { TourBookingRequestFormComponent } from './tour-booking-request-form/tour-booking-request-form.component';
import { TourBookingRequestsListComponent } from './tour-booking-requests-list/tour-booking-requests-list.component';
import { ToursRoutingModule } from '@app/main/customer/tour-booking-requests/tour-booking-requests-routing.module';

@NgModule({
    declarations: [
        TourBookingRequestDetailsComponent,
        TourBookingRequestFormComponent,
        TourBookingRequestsListComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppSharedModule,
        MainPageModule,
        RootSharedModule,
        HttpClientModule,
        ToursRoutingModule
    ],
})
export class TourBookingRequestsModule {}
