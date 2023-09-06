import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPageComponent } from './details-page.component';
import { AngularMaterialModule } from '../../modules/angular-material/angular-material.module';
import { InputBoxModule } from '../input-box/input-box.module';



@NgModule({
  declarations: [
    DetailsPageComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    InputBoxModule,
  ],
  exports: [
    DetailsPageComponent
  ]
})
export class DetailsPageModule { }
