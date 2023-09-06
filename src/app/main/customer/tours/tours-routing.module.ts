import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TourBookingsListComponent } from './tour-bookings-list/tour-bookings-list.component';
import { TourComponent } from './tour/tour.component';
import { RouteManagementComponent } from './route-management/route.component';

const routes: Routes = [
    {
        path: '',
        component: TourBookingsListComponent,
        pathMatch: 'full',
    },
    {
        path: 'route-management',
        component: RouteManagementComponent,
    },
    {
        path: ':id',
        component: TourComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ToursRoutingModule { }
