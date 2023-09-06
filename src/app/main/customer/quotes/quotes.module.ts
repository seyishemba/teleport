import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotesRoutingModule } from './quotes-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { MainPageModule } from '@shared/components/main-page/main-page.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { QuotesListComponent } from './quotes-list/quotes-list.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [QuotesListComponent],
    imports: [
        CommonModule,
        QuotesRoutingModule,
        ReactiveFormsModule,
        AppSharedModule,
        MainPageModule,
        RootSharedModule,
        HttpClientModule,
    ],
})
export class QuotesModule {}
