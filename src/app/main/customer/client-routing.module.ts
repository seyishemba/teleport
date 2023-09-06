import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientLoginComponent } from './auth/client-login/client-login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login/email', pathMatch: 'full' },
  { path: 'auth/login', component: ClientLoginComponent },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientRoutingModule {}
