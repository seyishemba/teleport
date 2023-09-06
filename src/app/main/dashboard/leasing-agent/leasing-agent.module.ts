import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeasingAgentRoutingModule } from './leasing-agent-routing.module';
import { CoucheListComponent } from './couches/couche-list/couche-list.component';
import { CreateOrEditCouchComponent } from './couches/create-or-edit-couch/create-or-edit-couch.component';
import { AppSharedModule } from '@app/shared/app-shared.module';
import { RootSharedModule } from '@shared/root-shared.module';
import { CouchComponent } from './couches/couch/couch.component';

@NgModule({
  declarations: [
    CoucheListComponent,
    CreateOrEditCouchComponent,
    CouchComponent,
  ],
  imports: [
    CommonModule,
    LeasingAgentRoutingModule,
    RootSharedModule,
    AppSharedModule,
  ]
})
export class LeasingAgentModule { }
