import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToursRoutingModule } from './tours-routing.module';
import { TourComponent } from './tour/tour.component';
import { TourBookingsListComponent } from './tour-bookings-list/tour-bookings-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MainPageModule } from '@shared/components/main-page/main-page.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { RouteManagementComponent } from './route-management/route.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddStopComponent } from './add-stop/add-stop';

@NgModule({
    declarations: [TourComponent, TourBookingsListComponent, RouteManagementComponent, AddStopComponent],
    imports: [
        CommonModule,
        ToursRoutingModule,
        ReactiveFormsModule,
        AppSharedModule,
        MainPageModule,
        RootSharedModule,
        HttpClientModule,
        DragDropModule
    ],
})
export class ToursModule { }
