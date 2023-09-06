import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MainPageModule } from '@shared/components/main-page/main-page.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { ReportsRoutingModule } from '@app/main/customer/reports/reports-list/reports-routing.module';
import { ReportsListComponent } from '@app/main/customer/reports/reports-list/reports-list.component';


@NgModule({
    declarations: [
        ReportsListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppSharedModule,
        MainPageModule,
        RootSharedModule,
        ReportsRoutingModule,
    ]
})
export class ReportsModule { }
