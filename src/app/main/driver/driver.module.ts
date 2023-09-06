import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MainPageModule } from '@shared/components/main-page/main-page.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AvailabilityComponent } from './availability/availability.component';
import { AdminSharedModule } from '../../admin/shared/admin-shared.module';
import { RequestTimeOffComponent } from './modal/request-time-off/request-time-off.component';
import { TourSchedulesListComponent } from './tour-schedules/tour-schedule-list/tour-shedule-list.component';
import { TourScheduleComponent } from './tour-schedules/tour-schedule/tour-schedule.component';

@NgModule({
    declarations: [
        AvailabilityComponent,
        RequestTimeOffComponent,
        TourSchedulesListComponent,
        TourScheduleComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppSharedModule,
        FormsModule,
        MainPageModule,
        RootSharedModule,
        HttpClientModule,
        DriverRoutingModule,
        AdminSharedModule,
    ],
})
export class DriverModule { }
