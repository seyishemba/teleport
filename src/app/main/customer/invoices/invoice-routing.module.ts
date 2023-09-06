import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceScheduleDetailComponent } from './invoice-schedule-detail/invoice-schedule-detail.component';
import { InvoiceSchedulesComponent } from './invoice-schedules/invoice-schedules.component';
import { InvoiceScheduleListComponent } from './invoice-schedule-list/invoice-schedule-list.component';


const routes: Routes = [
    {
        path: '',
        component: InvoiceComponent,
        pathMatch: 'full',
    },
    {
        path: 'invoice-shedule',
        component: InvoiceSchedulesComponent
    },
    {
        path: 'invoice-detail/:id',
        component: InvoiceScheduleDetailComponent,
    },
    {
        path: 'invoice-list',
        component: InvoiceScheduleListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InvoiceRoutingModule { }
