import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverLoginRoutingModule } from './driver-login-routing.module';
import { DriverLoginEmailComponent } from './driver-login-email.component';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { LoginService } from '@account/login/login.service';
import { LoginModule } from '@account/login/login.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { EmergencyContactComponent } from '../auth/sign-up/forms/emergency-contact/emergency-contact.component';
import { OtherDetailsComponent } from '../auth/sign-up/forms/other-details/other-details.component';
import { PersonalInformationComponent } from '../auth/sign-up/forms/personal-information/personal-information.component';
import { SummaryComponent } from '../auth/sign-up/forms/summary/summary.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

@NgModule({
    declarations: [
        DriverLoginEmailComponent,
        SignUpComponent,
        PersonalInformationComponent,
        OtherDetailsComponent,
        EmergencyContactComponent,
        SummaryComponent,
    ],
    imports: [
        CommonModule,
        DriverLoginRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        RootSharedModule,
        AppSharedModule,
        AccountSharedModule,
        OAuthModule.forRoot(),
    ],
    providers: [LoginService],
})
export class DriverLoginModule {}
