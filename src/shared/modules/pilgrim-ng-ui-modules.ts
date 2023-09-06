import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'pilgrim-ng-ui-library';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule
  ],
  exports: [TableModule]
})
export class PilgrimUIModule { }
