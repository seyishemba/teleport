import { LoginService } from '@account/login/login.service';
import { Component, Injector, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AuthenticateModel, AuthenticateResultModel, UserTypeEnum } from '@shared/service-proxies/service-proxies';
import { Observable, Subscription } from 'rxjs';

export type checkEmailFunction = (email: string) => Observable<boolean>;
export type loginFunction = (email: string, password: string) => Observable<AuthenticateResultModel>;

@Component({
    selector: 'app-login-flow',
    templateUrl: './login-flow.component.html',
    styleUrls: ['./login-flow.component.css'],
})
export class LoginFlowComponent extends AppComponentBase implements OnDestroy, OnInit {
    @Input() signupUrl: string;
    @Input() onLoggedInUrl: string;
    @Input() checkEmailFunction: checkEmailFunction;
    @Input() loginFunction: loginFunction;
    @Input() userType: UserTypeEnum;

    checkEmailSubscription: Subscription;
    loginSubscription: Subscription;
    emailExist = false;
    loginForm: FormGroup;
    submitting = false;
    constructor(
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private _router: Router,
        private injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.initForm();
    }

    checkForEmail() {
        this.submitting = true;
        if (this.checkEmailFunction) {
            this.checkEmailSubscription = this.checkEmailFunction(this.loginForm.value.email).subscribe({
                next: (emailExist) => {
                    this.emailExist = emailExist;
                    this.submitting = false;
                    if (!this.emailExist && this.signupUrl){
                       this._router.navigateByUrl(this.signupUrl);
                    }
                },
                error: (err) => {
                    console.log(err);
                    this.submitting = false;
                },
                complete: () => {
                    this.submitting = false;
                },
            });
        }
    }

    login() {
        this.submitting = true;
        this.showMainSpinner();
        const { email, password } = this.loginForm.value;
        this.loginService.authenticateModel.userNameOrEmailAddress = email;
        this.loginService.authenticateModel.password = password;
        this.loginService.authenticateModel.rememberClient = true;
        this.loginService.authenticateModel.userType = this.userType;
        this.loginService.authenticate(() => {
            this.submitting = false;
            this.hideMainSpinner();
        }, null);
    }

    ngOnDestroy(): void {
        if (this.checkEmailSubscription) {
            this.checkEmailSubscription.unsubscribe();
        }
        if (this.loginSubscription) {
            this.loginSubscription.unsubscribe();
        }
    }

    private initForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        });
    }
}
