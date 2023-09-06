import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsAPILoader } from '@agm/core';
import { CustomMapsAPILoader } from './custom-maps-api-loader';
import { FormsModule } from '@angular/forms';
import { GooglePlacesComponent } from './google-places.component';
import { SelectDropdownModule } from '../select-dropdown/select-dropdown.module';

@NgModule({
  declarations: [GooglePlacesComponent],
  exports: [GooglePlacesComponent],
  imports: [CommonModule, FormsModule, SelectDropdownModule],
  providers: [
    {
      provide: MapsAPILoader,
      useClass: CustomMapsAPILoader
    }
  ],
})
export class GooglePlacesModule {}
