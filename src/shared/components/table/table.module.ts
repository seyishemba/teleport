import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeleportTableComponent } from './table.component';
import { TableModule } from 'pilgrim-ng-ui-library';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { InputBoxModule } from '../input-box/input-box.module';
import { TableViewBtnComponent } from './table-view-btn/table-view-btn.component';

@NgModule({
  declarations: [TeleportTableComponent, TableViewBtnComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    AngularMaterialModule,
    InputBoxModule
  ],
  exports: [TeleportTableComponent, TableViewBtnComponent]
})
export class TeleportTableModule { }
