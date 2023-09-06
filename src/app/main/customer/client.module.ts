import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsModule } from './contracts/contracts.module';
import { ToursModule } from './tours/tours.module';
import { TourBookingRequestDetailsComponent } from './tour-booking-requests/tour-booking-request/tour-booking-request-details.component';
import { InvoicesModule } from './invoices/invoices.module';
import { LoginService } from '@account/login/login.service';
import { ClientLoginComponent } from './auth/client-login/client-login.component';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
    declarations: [ClientLoginComponent],
    imports: [
        CommonModule,
        ContractsModule,
        ToursModule,
        FormsModule,
        ReactiveFormsModule,
        RootSharedModule,
        AppSharedModule,
        AccountSharedModule,
        ClientRoutingModule,
        OAuthModule.forRoot(),
    ],
    providers: [LoginService]
})
export class ClientModule { }
