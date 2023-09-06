import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityComponent } from './availability/availability.component';
import { TourSchedulesListComponent } from './tour-schedules/tour-schedule-list/tour-shedule-list.component';

const routes: Routes = [
    { path: '', redirectTo: 'availability', pathMatch: 'full' },
    { path: 'availability', component: AvailabilityComponent },
    { path: 'tour-schedules', component: TourSchedulesListComponent }
    // { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DriverRoutingModule { }
