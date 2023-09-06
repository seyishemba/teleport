import { NgModule } from '@angular/core';
import { NavigationEnd, Router, RouterModule, Routes } from '@angular/router';
import { AppUiCustomizationService } from '@shared/common/ui/app-ui-customization.service';
import { CoachesComponent } from './app/main/pages/coaches/coaches.component';

const routes: Routes = [
    { path: '', redirectTo: '/app/main/dashboard', pathMatch: 'full' },
    {
        path: 'account',
        loadChildren: () => import('account/account.module').then((m) => m.AccountModule), //Lazy load account module
        data: { preload: true },
    },
    {
        path: 'driver',
        loadChildren: () => import('account/driver/driver-login.module').then((m) => m.DriverLoginModule), //Lazy load account module
        data: { preload: true },
    },
    {
        path: 'client',
        loadChildren: () => import('app/main/customer/client.module').then((m) => m.ClientModule), //Lazy load account module
        data: { preload: true },
    },
    {
        path: 'leasing-agent',
        loadChildren: () => import('account/leasing-agent/leasingagent.module').then((m) => m.LeasingagentModule), //Lazy load account module
        data: { preload: true },
    },
    { path: 'coaches', component: CoachesComponent },
    { path: '**', redirectTo: '/app/main/dashboard' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [],
})
export class RootRoutingModule {
    constructor(private router: Router, private _uiCustomizationService: AppUiCustomizationService) {
        router.events.subscribe((event: NavigationEnd) => {
            setTimeout(() => {
                this.toggleBodyCssClass(event.url);
            }, 0);
        });
    }  

    toggleBodyCssClass(url: string): void {
        if (url) {
            if (url === '/') {
                if (abp.session.userId > 0) {
                    this.setAppModuleBodyClassInternal();
                } else {
                    this.setAccountModuleBodyClassInternal();
                }
            }

            if (url.indexOf('/account/') >= 0) {
                this.setAccountModuleBodyClassInternal();
            } else {
                this.setAppModuleBodyClassInternal();
            }
        }
    }

    setAppModuleBodyClassInternal(): void {
        let currentBodyClass = document.body.className;
        let classesToRemember = '';

        if (currentBodyClass.indexOf('brand-minimize') >= 0) {
            classesToRemember += ' brand-minimize ';
        }

        if (currentBodyClass.indexOf('aside-left-minimize') >= 0) {
            classesToRemember += ' aside-left-minimize';
        }

        if (currentBodyClass.indexOf('brand-hide') >= 0) {
            classesToRemember += ' brand-hide';
        }

        if (currentBodyClass.indexOf('aside-left-hide') >= 0) {
            classesToRemember += ' aside-left-hide';
        }

        if (currentBodyClass.indexOf('swal2-toast-shown') >= 0) {
            classesToRemember += ' swal2-toast-shown';
        }

        document.body.className = this._uiCustomizationService.getAppModuleBodyClass() + ' ' + classesToRemember;
    }

    setAccountModuleBodyClassInternal(): void {
        let currentBodyClass = document.body.className;
        let classesToRemember = '';

        if (currentBodyClass.indexOf('swal2-toast-shown') >= 0) {
            classesToRemember += ' swal2-toast-shown';
        }

        document.body.className = this._uiCustomizationService.getAccountModuleBodyClass() + ' ' + classesToRemember;
    }

    getSetting(key: string): string {
        return abp.setting.get(key);
    }
}
