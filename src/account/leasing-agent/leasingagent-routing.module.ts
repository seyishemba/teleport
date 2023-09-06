// import { LeasingAgentLoginComponent } from '@account/login/leasing-agent/leasing-agent-login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeasingAgentLoginComponent } from './auth/leasing-agent-login/leasing-agent-login.component';

const routes: Routes = [{path: '', component: LeasingAgentLoginComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeasingagentRoutingModule { }
