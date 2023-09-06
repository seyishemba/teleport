import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SelectDropdownComponent } from './select-dropdown.component';
import { InputBoxModule } from '../input-box/input-box.module';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';

@NgModule({
  declarations: [SelectDropdownComponent],
  imports: [
    CommonModule,
    FormsModule,
    InputBoxModule,
    AngularMaterialModule
  ],
  exports: [SelectDropdownComponent]
})
export class SelectDropdownModule { }
