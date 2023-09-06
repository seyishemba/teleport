import { NgModule } from '@angular/core';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RegisterRoutingModule } from './register-routing.module';
import { AccountSharedModule } from '@account/shared/account-shared.module';
import { RegisterComponent } from './register.component';
import { PasswordModule } from 'primeng/password';
import { SignUpComponent } from './client/signup.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RootSharedModule } from '@shared/root-shared.module';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RootSharedModule, AppSharedModule, AccountSharedModule, RegisterRoutingModule, PasswordModule],
    declarations: [RegisterComponent, SignUpComponent],
})
export class RegisterModule {}
