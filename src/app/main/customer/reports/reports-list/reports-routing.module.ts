import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ReportsListComponent} from '@app/main/customer/reports/reports-list/reports-list.component';

const routes: Routes = [
    {
        path: '',
        component: ReportsListComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ReportsRoutingModule {}
