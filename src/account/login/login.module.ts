import { ClientLoginEmailComponent } from './client/email/client-login-email.component';
import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientLoginPasswordComponent } from './client/password/login-password.component';
import { LeasingAgentLoginComponent } from './leasing-agent/leasing-agent-login.component';
// import { DriverLoginEmailComponent } from './driver/email/driver-login-email.component';

@NgModule({
    declarations: [LoginComponent, ClientLoginEmailComponent, ClientLoginPasswordComponent, LeasingAgentLoginComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RootSharedModule,
        AppSharedModule,
        AccountSharedModule,
        LoginRoutingModule],
})
export class LoginModule { }
