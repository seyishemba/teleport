import { Component, Injector, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConsts } from '@shared/AppConsts';
import { AppComponentBase } from '@shared/common/app-component-base';
import { AppUiCustomizationService } from '@shared/common/ui/app-ui-customization.service';
import { filter as _filter } from 'lodash-es';
import { LoginService } from './login/login.service';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { UrlHelper } from '@shared/helpers/UrlHelper';

export interface LoginType {
    lable: string;
    icon: string;
    route: string;
}

@Component({
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class AccountComponent extends AppComponentBase implements OnInit {
    isHost: boolean;
    currentYear: number = this._dateTimeService.getYear();
    remoteServiceBaseUrl: string = AppConsts.remoteServiceBaseUrl;
    skin = this.appSession.theme.baseSettings.layout.darkMode ? 'dark' : 'light';
    defaultLogo = AppConsts.appBaseUrl + '/assets/common/images/app-logo-on-' + this.skin + '.svg';
    backgroundImageName = this.appSession.theme.baseSettings.layout.darkMode ? 'login-dark' : 'login';
    loginTypes: LoginType[] = [
        { lable: 'Client', icon: 'person', route: '/client/auth/login' },
        { lable: 'Driver', icon: 'directions_bus', route: '/driver' },
        { lable: 'Leasing agent', icon: 'badge', route: '/leasing-agent' }
    ];

    tenantChangeDisabledRoutes: string[] = [
        'select-edition',
        'buy',
        'upgrade',
        'extend',
        'register-tenant',
        'stripe-purchase',
        'stripe-subscribe',
        'stripe-update-subscription',
        'paypal-purchase',
        'stripe-payment-result',
        'payment-completed',
        'stripe-cancel-payment',
        'session-locked',
    ];

    userType: string;

    private viewContainerRef: ViewContainerRef;


    public constructor(
        injector: Injector,
        private _router: Router,
        private _loginService: LoginService,
        private _uiCustomizationService: AppUiCustomizationService,
        private _dateTimeService: DateTimeService,
        viewContainerRef: ViewContainerRef,
        private activatedRoute: ActivatedRoute
    ) {
        super(injector);

        // We need this small hack in order to catch application root view container ref for modals
        this.viewContainerRef = viewContainerRef;

    }


    showTenantChange(): boolean {
        if (!this._router.url) {
            return false;
        }

        if (
            _filter(this.tenantChangeDisabledRoutes, (route) => this._router.url.indexOf('/account/' + route) >= 0)
                .length
        ) {
            return false;
        }

        return abp.multiTenancy.isEnabled && !this.supportsTenancyNameInUrl();
    }

    isSelectEditionPage(): boolean {
        return this._router.url.indexOf('/account/select-edition') >= 0;
    }

    ngOnInit(): void {
        this._loginService.init();
        document.body.className = this._uiCustomizationService.getAccountModuleBodyClass();
        this.isHost = this.showAsHost();
        this._router.events.subscribe(() => {
            //hack ! by Osman
            this.isHost = false;
        });

    }

    goToHome(): void {
        (window as any).location.href = '/';
    }

    getBgUrl(): string {
        return 'url(./assets/metronic/themes/' + this.currentTheme.baseSettings.theme + '/images/bg/bg-4.jpg)';
    }


    private supportsTenancyNameInUrl() {
        console.log(AppConsts.appBaseUrlFormat, 'tenancey...te...');
        return (
            AppConsts.appBaseUrlFormat && AppConsts.appBaseUrlFormat.indexOf(AppConsts.tenancyNamePlaceHolderInUrl) >= 0
        );
    }

    private showAsHost(): boolean {
        const qp = UrlHelper.getInitialUrlParameters();
        if (qp) {
            return true;
        }
        return !this.hasSubdomain(window.location.href);
    }
    private hasSubdomain(url: string): boolean {
        try {
            const parsedUrl = new URL(url);
            const parts = parsedUrl.hostname.split('.');
            console.log(parts, 'parts..');
            return parts.length > 1;
        } catch (error) {
            return false;
        }
    }

}
