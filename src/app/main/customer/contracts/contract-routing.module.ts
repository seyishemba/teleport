import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContractListComponent } from './contract-list/contract-list.component';
import { ContractComponent } from './contract/contract.component';

const routes: Routes = [
    {
        path: '',
        component: ContractListComponent,
        pathMatch: 'full',
    },
    {
        path: ':id',
        component: ContractComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ContractsRoutingModule {}
