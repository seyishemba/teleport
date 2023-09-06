import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractsRoutingModule } from './contract-routing.module';
import { ContractComponent } from './contract/contract.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MainPageModule } from '@shared/components/main-page/main-page.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { ContractListComponent } from './contract-list/contract-list.component';

@NgModule({
    declarations: [ContractComponent, ContractListComponent],
    imports: [
        CommonModule,
        ContractsRoutingModule,
        ReactiveFormsModule,
        AppSharedModule,
        MainPageModule,
        RootSharedModule,
        HttpClientModule,
    ],
})
export class ContractsModule {}
