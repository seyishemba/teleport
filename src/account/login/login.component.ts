import { AbpSessionService } from 'abp-ng2-module';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { accountModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/common/app-component-base';
import { SessionServiceProxy, UpdateUserSignInTokenOutput, UserTypeEnum } from '@shared/service-proxies/service-proxies';
import { UrlHelper } from 'shared/helpers/UrlHelper';
import { ExternalLoginProvider, LoginService } from './login.service';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { AppConsts } from '@shared/AppConsts';

@Component({
    templateUrl: './login.component.html',
    animations: [accountModuleAnimation()],
    styleUrls: ['./login.component.less'],
})
export class LoginComponent extends AppComponentBase implements OnInit {
    submitting = false;
    isMultiTenancyEnabled: boolean = this.multiTenancy.isEnabled;
    recaptchaSiteKey: string = AppConsts.recaptchaSiteKey;

    userType: string;
    emailFromEmailScreen: string;
    showEmailScreen = true;
    showPasswordScreen = false;

    constructor(
        injector: Injector,
        public loginService: LoginService,
        private _router: Router,
        private _sessionService: AbpSessionService,
        private _sessionAppService: SessionServiceProxy,
        private _reCaptchaV3Service: ReCaptchaV3Service
    ) {
        super(injector);
    }

    get multiTenancySideIsTeanant(): boolean {
        return this._sessionService.tenantId > 0;
    }

    get isTenantSelfRegistrationAllowed(): boolean {
        return this.setting.getBoolean('App.TenantManagement.AllowSelfRegistration');
    }

    get isSelfRegistrationAllowed(): boolean {
        if (!this._sessionService.tenantId) {
            return false;
        }

        return this.setting.getBoolean('App.UserManagement.AllowSelfRegistration');
    }

    get useCaptcha(): boolean {
        return this.setting.getBoolean('App.UserManagement.UseCaptchaOnLogin');
    }

    ngOnInit(): void {
        if (this._sessionService.userId > 0 && UrlHelper.getReturnUrl() && UrlHelper.getSingleSignIn()) {
            this._sessionAppService.updateUserSignInToken().subscribe((result: UpdateUserSignInTokenOutput) => {
                const initialReturnUrl = UrlHelper.getReturnUrl();
                const returnUrl =
                    initialReturnUrl +
                    (initialReturnUrl.indexOf('?') >= 0 ? '&' : '?') +
                    'accessToken=' +
                    result.signInToken +
                    '&userId=' +
                    result.encodedUserId +
                    '&tenantId=' +
                    result.encodedTenantId;

                location.href = returnUrl;
            });
        }

        this.handleExternalLoginCallbacks();

        // Get the full URL from the browser
        const currentUrl = window.location.href;

        // Check if the URL contains a specific string
        if (currentUrl.includes('client')) {
            this.userType = 'client';
        } else if (currentUrl.includes('leasing-agent')) {
            this.userType = 'leasing-agent';
        } else if (currentUrl.includes('driver')) {
            this.userType = 'driver';
        }
    }

    handleExternalLoginCallbacks(): void {
        let state = UrlHelper.getQueryParametersUsingHash().state;
        let queryParameters = UrlHelper.getQueryParameters();

        if (state && state.indexOf('openIdConnect') >= 0) {
            this.loginService.openIdConnectLoginCallback({});
        }

        if (queryParameters.state && queryParameters.state.indexOf('openIdConnect') >= 0) {
            this.loginService.openIdConnectLoginCallback({});
        }

        if (queryParameters.twitter && queryParameters.twitter === '1') {
            let parameters = UrlHelper.getQueryParameters();
            let token = parameters['oauth_token'];
            let verifier = parameters['oauth_verifier'];
            this.loginService.twitterLoginCallback(token, verifier);
        }
    }

    checkIfEmailRegistered(email: string) {
        this.showMainSpinner();

        let callBack = ((response: boolean) => {
            this.hideMainSpinner();
            if (response === false) {
                this._router.navigate(['/client/register'], { queryParams: { email: email } });
            } else {
                this.emailFromEmailScreen = email;

                this.showEmailScreen = false;
                this.showPasswordScreen = true;
            }
        });

        this.submitting = true;
        // this.loginService.isEmailRegistered(email, callBack);
    }

    onLogin(password: string) {
        this.loginService.authenticateModel.userNameOrEmailAddress = this.emailFromEmailScreen;
        this.loginService.authenticateModel.password = password;

        this.login();
    }

    login(): void {
        this.loginService.authenticateModel.userType = UserTypeEnum.Host;
        let recaptchaCallback = (token: string) => {
            this.showMainSpinner();

            this.submitting = true;
            this.loginService.authenticate(
                () => {
                    this.submitting = false;
                    this.hideMainSpinner();
                },
                null,
                token
            );
        };

        if (this.useCaptcha) {
            this._reCaptchaV3Service.execute(this.recaptchaSiteKey, 'login', (token) => {
                recaptchaCallback(token);
            });
        } else {
            recaptchaCallback(null);
        }
    }

    externalLogin(provider: ExternalLoginProvider) {
        this.loginService.externalAuthenticate(provider);
    }

}
