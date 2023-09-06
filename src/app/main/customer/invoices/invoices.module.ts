import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { SharedModule } from '../../shared/shared.module';
// import { CdkDropListGroup, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop'
import { CdkDropListGroup, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';

import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { InvoiceSchedulesComponent } from './invoice-schedules/invoice-schedules.component';
import { InvoiceScheduleDetailComponent } from './invoice-schedule-detail/invoice-schedule-detail.component';
import { InvoiceScheduleListComponent } from './invoice-schedule-list/invoice-schedule-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AdjustmentComponent } from './adjustment/adjustment.component';
import { ClickOutsideDirective } from './click-outside.directive';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MainPageModule } from '@shared/components/main-page/main-page.module';
import { PilgrimUIModule } from '@shared/modules/pilgrim-ng-ui-modules';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoicesServiceProxy } from '@shared/service-proxies/service-proxies';

@NgModule({
  declarations: [
    InvoiceComponent,
    InvoiceListComponent,
    InvoiceSchedulesComponent,
    InvoiceScheduleDetailComponent,
    InvoiceScheduleListComponent,
    AdjustmentComponent,
    ClickOutsideDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AppSharedModule,
    MainPageModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatNativeDateModule,
    PilgrimUIModule,
    DragDropModule,
    InvoiceRoutingModule
    // CdkDropListGroup, CdkDrag, CdkDropList
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
    InvoicesServiceProxy
  ]
})
export class InvoicesModule { }
