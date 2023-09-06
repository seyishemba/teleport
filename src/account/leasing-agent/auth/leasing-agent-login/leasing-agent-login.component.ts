import { LoginService } from '@account/login/login.service';
import { Component } from '@angular/core';
import { UserTypeEnum } from '@shared/service-proxies/service-proxies';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-leasing-agent-login',
  templateUrl: './leasing-agent-login.component.html',
  styleUrls: ['./leasing-agent-login.component.css']
})
export class LeasingAgentLoginComponent {
    userType = UserTypeEnum.LeasingAgent;
    constructor( private loginService: LoginService){

    }

    checkEmail = (email: string): Observable<boolean> => this.loginService.isEmailRegistered(email, this.userType);
}
