import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotesListComponent } from './quotes-list/quotes-list.component';

const routes: Routes = [
    {
        path: '',
        component: QuotesListComponent,
        pathMatch: 'full',
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class QuotesRoutingModule {}
