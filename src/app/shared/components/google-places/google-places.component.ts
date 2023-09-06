import { MapsAPILoader } from '@agm/core';
import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-google-places',
  templateUrl: './google-places.component.html',
  styleUrls: ['./google-places.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GooglePlacesComponent),
      multi: true,
    },
  ],
})
export class GooglePlacesComponent implements ControlValueAccessor {
  @Input() componentInstanceId!: string;
  @Input() componentInstanceLabelId!: string;
  @Input() componentInstanceLabel!: string;

  @Output() touchedEvent = new EventEmitter<any>();

  searchTerm: string = '';
  predictions: google.maps.places.AutocompletePrediction[] = [];

  constructor(private mapsAPILoader: MapsAPILoader) {}

  // Placeholders for the callbacks which are later provided
  // by the Control Value Accessor
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  // This is the initial value set to the component
  writeValue(value: any) {
    if (value !== undefined) {
      this.searchTerm = value;
    }
  }

  // registers 'fn' that will be fired when the model changes
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // registers 'fn' that gets fired when the model is touched
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  async getPredictions() {
    if (this.searchTerm.trim() === '') {
      this.predictions = [];
    } else {
      this.mapsAPILoader
        .load()
        .then(() => {
          if (google && google.maps) {
            const autocomplete = new google.maps.places.AutocompleteService();
            autocomplete.getPlacePredictions(
              { input: this.searchTerm },
              (predictions, status) => {
                if (
                  status === google.maps.places.PlacesServiceStatus.OK &&
                  predictions
                ) {
                  this.predictions = predictions;
                } else {
                  this.predictions = [];
                  this.onChangeCallback(this.searchTerm);
                }
              }
            );
          } else {
            console.log('Google Maps API not loaded');
          }
        })
        .catch((err) => {
          console.log('Error loading Google Maps API: ', err);
          // handle error here
        });
    }
  }

  // Called when the select dropdown item is selected
  selectPrediction(prediction: google.maps.places.AutocompletePrediction) {
    this.searchTerm = prediction.description;
    this.predictions = [];

    // propagate changes into the form control using the custom value accessor
    this.onChangeCallback(this.searchTerm);
  }

  async onSearch(event: any | string): Promise<void> {
    this.searchTerm = event;
    await this.getPredictions();
  }

  onClear(): void {
    this.searchTerm = '';
    this.predictions = [];
  }

  onBlur():void{
    this.touchedEvent.emit();
  }
}
