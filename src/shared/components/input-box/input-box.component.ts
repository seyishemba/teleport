import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  forwardRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  AfterContentInit,
  AfterViewChecked,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => InputBoxComponent),
  multi: true,
};

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
  providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR],
})
export class InputBoxComponent
  implements OnInit, AfterViewInit, ControlValueAccessor
{
  @Output() inputEvent = new EventEmitter<string>();
  @Output() focusEvent = new EventEmitter<void>();
  @Output() blurEvent = new EventEmitter<void>();

  @Input() label = 'label name';
  @Input() formType = 'text';
  @Input() inputBoxId!: string;
  @Input() floatingLabelId!: string;
  @Input() customInputStyle = '';
  @Input() customLabelStyle = '';
  @Input() isDisabled = false;

  @ViewChild('inputBoxRef') inputBoxRef!: ElementRef<HTMLInputElement>;
  @ViewChild('floatingLabelRef')
  floatingLabelRef!: ElementRef<HTMLLabelElement>;

  private innerValue = '';

  onChange: any = (_: any) => {};
  onTouch: any = () => {};

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.handleFloatingLabel();
  }

  get value(): any {
    return this.innerValue;
  }

  set value(v: any) {
    if (v !== this.innerValue) {
      this.innerValue = v;
      this.onChange(v);
    }
  }

  onInputChange(event: Event): void {
    this.innerValue = (event.target as HTMLInputElement).value;
    this.onChange(this.innerValue);
    // this.handleFloatingLabel();
    this.inputEvent.emit(this.innerValue);
  }

  writeValue(value: any): void {
    this.innerValue = value;
    // this.handleFloatingLabel();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onFocus(): void {
    if (this.floatingLabelRef) {
      this.floatingLabelRef.nativeElement.classList.remove('top-4');
      this.floatingLabelRef.nativeElement.classList.add(
        'top-0',
        'bg-white',
        'text-xs',
        'px-1'
      );
    }
    this.focusEvent.emit();
  }

  onBlur(): void {
    if (this.floatingLabelRef) {
      this.handleFloatingLabel();
    }
    this.onTouch();
    this.blurEvent.emit();
  }

  private handleFloatingLabel(): void {
    if (this.floatingLabelRef) {
      if (
        (this.innerValue !== '' ||
        this.inputBoxRef.nativeElement.value !== '') || (this.formType === "date" || this.formType === "time")
      ) {
        this.floatingLabelRef.nativeElement.classList.remove('top-4');
        this.floatingLabelRef.nativeElement.classList.add(
          'top-0',
          'bg-white',
          'text-xs',
          'px-1'
        );
      } else {
        this.floatingLabelRef.nativeElement.classList.remove(
          'top-0',
          'bg-white',
          'text-xs',
          'px-1'
        );
        this.floatingLabelRef.nativeElement.classList.add('top-4');
      }
    }
  }
}
