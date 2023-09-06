import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page.component';
import { InputBoxModule } from '../input-box/input-box.module';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { FormsModule } from '@angular/forms';
import { TeleportTableModule } from '../table/table.module';
import { TableModule } from 'pilgrim-ng-ui-library';

@NgModule({
  declarations: [MainPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    AngularMaterialModule,
    TeleportTableModule,
    TableModule,
    InputBoxModule,
  ],
  exports: [MainPageComponent]
})
export class MainPageModule { }
