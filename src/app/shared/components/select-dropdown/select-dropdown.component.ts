import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  forwardRef,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputBoxComponent } from '../input-box/input-box.component';

export const CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectDropdownComponent),
  multi: true,
};

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css'],
  providers: [CUSTOM_SELECT_CONTROL_VALUE_ACCESSOR],
})
export class SelectDropdownComponent implements OnInit, ControlValueAccessor {
  @ViewChild('inputBoxComponent')
  inputBoxComponent!: InputBoxComponent;

  @Output() optionSelected = new EventEmitter<any>();
  @Output() inputEvent = new EventEmitter<any>();
  @Output() touchedEvent = new EventEmitter<any>();

  @Input() label: string = 'label name';
  @Input() dropDownBoxId!: string;
  @Input() floatingLabelId!: string;
  @Input() customInputStyle: string = '';
  @Input() customIcon: string = '';
  @Input() options:
    | any[]
    | google.maps.places.AutocompletePrediction[]
    | { label: string; value: any }[] = [];

  isDropdownOpen: boolean = false;
  searchText: string = '';
  filteredOptions:
    | any[]
    | google.maps.places.AutocompletePrediction[]
    | { label: string; value: any }[] = [];

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.filteredOptions = this.options;
  }

  // The internal data model
  private innerValue: any = 'alsdkfjalskdjfalsd';

  //Placeholders for the callbacks
  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  //get accessor
  get value(): any {
    return this.innerValue;
  }

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChangeCallback(v);
    }
  }

  // From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== this.innerValue) {
      this.innerValue = value;
    }
  }

  // From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  // From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  onSearch(event: Event): void {
    let searchText = (event.target as HTMLInputElement).value;

    this.inputEvent.emit(searchText);

    if (this.options.length > 0) {
      this.searchText = searchText;

      this.filteredOptions = this.options.filter((option) => {
        if (option.label) {
          return option.label.toLowerCase().includes(this.searchText.toLowerCase());
        } else if (option as google.maps.places.AutocompletePrediction) {
          return (option.description as string)
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        }
      });
    }
  }

  onOptionSelect(option: any): void {
    if (option.value) {
      this.value = option.label;
      this.optionSelected.emit(option);
    } else if (option as google.maps.places.AutocompletePrediction) {
      this.value = option;
      this.optionSelected.emit(this.value);
    }

    this.searchText = option.value ? this.value : this.value.description;

    // simulate click or focus event on input box
    this.inputBoxComponent.onFocus();
    this.changeDetector.detectChanges();

    this.isDropdownOpen = false;


  }

  onInput(event: any | string): void {
    this.inputEvent.emit(event);
  }

  onFocus(): void {
    this.isDropdownOpen = true;
  }

  onBlur(): void {
    this.isDropdownOpen = false;
    this.touchedEvent.emit()
  }
}
