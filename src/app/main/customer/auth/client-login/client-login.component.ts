import { LoginService } from '@account/login/login.service';
import { Component } from '@angular/core';
import { UserTypeEnum } from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent {
    clientUserType = UserTypeEnum.Customer;

    constructor( private loginService: LoginService){

    }

    checkEmail = (email: string): Observable<boolean> => this.loginService.isEmailRegistered(email, this.clientUserType);
}
