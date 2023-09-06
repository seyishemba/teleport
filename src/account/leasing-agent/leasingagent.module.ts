import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeasingagentRoutingModule } from './leasingagent-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { OAuthModule } from 'angular-oauth2-oidc';
import { LeasingAgentLoginComponent } from './auth/leasing-agent-login/leasing-agent-login.component';


@NgModule({
  declarations: [
    LeasingAgentLoginComponent
  ],
  imports: [
    CommonModule,
    LeasingagentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RootSharedModule,
    AppSharedModule,
    AccountSharedModule,
    OAuthModule.forRoot(),
  ]
})
export class LeasingagentModule { }
