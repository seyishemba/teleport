import { LoginService } from '@account/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserTypeEnum } from '@shared/service-proxies/service-proxies';
import { Observable, of, take } from 'rxjs';

@Component({
    selector: 'app-driver-login-email',
    templateUrl: './driver-login-email.component.html',
    styleUrls: ['./driver-login-email.component.css']
})
export class DriverLoginEmailComponent implements OnInit {
    userType = UserTypeEnum.Driver;
    constructor(
        private loginService: LoginService

    ) { }

    ngOnInit(): void {

    }

    onNextClick() {

    }

    checkEmail = (email: string): Observable<boolean> => this.loginService.isEmailRegistered(email, this.userType);

}
