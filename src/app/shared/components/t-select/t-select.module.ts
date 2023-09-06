import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TSelectComponent } from './t-select.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TSelectComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    TSelectComponent
  ]
})
export class TSelectModule { }
