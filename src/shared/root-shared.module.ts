import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideBarComponent } from './components/side-bar/side-bar.component';
import { RouterModule } from '@angular/router';
import { SidebarService } from './components/side-bar/side-bar.service';
import { AngularMaterialModule } from './modules/angular-material/angular-material.module';
import { InputBoxModule } from './components/input-box/input-box.module';
import { MainPageModule } from './components/main-page/main-page.module';
import { TeleportTableModule } from './components/table/table.module';
import { ModalComponent } from './components/modal/modal.component';
import { SelectDropdownModule } from './components/select-dropdown/select-dropdown.module';
import { GooglePlacesModule } from './components/google-places/google-places.module';
import { AngularFirebaseModule } from './modules/angular-firebase/angular-firebase.module';
import { StatePillComponent } from './components/state-pill/state-pill.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { DetailsPageModule } from './components/details-page/details-page.module';
import { LoadingModalComponent } from './components/loading-modal/loading-modal.component';
import { PilgrimUIModule } from './modules/pilgrim-ng-ui-modules';
import { LoginFlowComponent } from './components/login-flow/login-flow.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '@account/login/login.service';
import { UtilsModule } from './utils/utils.module';

@NgModule({
  declarations: [
    SideBarComponent,
    ModalComponent,
    StatePillComponent,
    LoadingModalComponent,
    LoginFlowComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    AngularFirebaseModule,
    GooglePlacesModule,
    PilgrimUIModule,
    InputBoxModule,
    SelectDropdownModule,
    TeleportTableModule,
    MainPageModule,
    DetailsPageModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule 
  ],
  exports: [
    SideBarComponent,
    ModalComponent,
    StatePillComponent,
    AngularMaterialModule,
    AngularFirebaseModule,
    GooglePlacesModule,
    PilgrimUIModule,
    InputBoxModule,
    SelectDropdownModule,
    TeleportTableModule,
    MainPageModule,
    DetailsPageModule,
    LoginFlowComponent
  ],
  providers: [SidebarService,LoginService]
})
export class RootSharedModule { }
