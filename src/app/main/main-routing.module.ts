import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TourBookingRequestFormComponent } from './customer/tour-booking-requests/tour-booking-request-form/tour-booking-request-form.component';
import { CoachesComponent } from './pages/coaches/coaches.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                children: [
                    { path: 'coaches', component: CoachesComponent },
                    {
                        path: 'dashboard',
                        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
                        // data: { permission: 'Pages.Tenant.Dashboard' },
                    },
                    {
                        path: 'quotes',
                        loadChildren: () => import('./customer/quotes/quotes.module').then((m) => m.QuotesModule),
                        data: { permission: null },
                    },
                    {
                        path: 'driver',
                        loadChildren: () => import('./driver/driver-routing.module').then((m) => m.DriverRoutingModule),
                        data: { permission: null },
                    },
                    {
                        path: 'leasing-agent',
                        loadChildren: () => import('./leasing-agent/leasing-agent.module').then((m) => m.LeasingAgentModule),
                        data: { permission: null },
                    },
                    {
                        path: 'contracts',
                        loadChildren: () =>
                            import('./customer/contracts/contracts.module').then((m) => m.ContractsModule),
                        data: { permission: null },
                    },
                    {
                        path: 'tours',
                        loadChildren: () => import('./customer/tours/tours.module').then((m) => m.ToursModule),
                        data: { permission: null },
                    },
                    {
                        path: 'booking-requests',
                        loadChildren: () =>
                            import('./customer/tour-booking-requests/tour-booking-requests.module').then(
                                (m) => m.TourBookingRequestsModule
                            ),
                        data: { permission: null },
                    },
                    {
                        path: 'reports',
                        loadChildren: () => import('./customer/reports/reports.module').then((m) => m.ReportsModule),
                        data: { permission: null },
                    },
                    {
                        path: 'invoices',
                        loadChildren: () => import('./customer/invoices/invoices.module').then((m) => m.InvoicesModule),
                        data: { permission: null },
                    },


                    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
                    { path: '**', redirectTo: 'dashboard' },
                ],
            },
        ]),
    ],
    exports: [RouterModule],
})
export class MainRoutingModule { }
