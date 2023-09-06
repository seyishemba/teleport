import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DriverLoginEmailComponent } from './driver-login-email.component';
import { SignUpComponent } from '../auth/sign-up/sign-up.component';

const routes: Routes = [
    {path: '', component: DriverLoginEmailComponent},
    {path: 'signup', component: SignUpComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverLoginRoutingModule { }
