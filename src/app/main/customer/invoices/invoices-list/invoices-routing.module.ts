import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InvoicesListComponent} from '@app/main/customer/invoices/invoices-list/invoices-list.component';

const routes: Routes = [
    {
        path: '',
        component: InvoicesListComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InvoicesRoutingModule {}
