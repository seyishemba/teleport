import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

interface MyObject {
  id: number;
  name: string;
  desc: string;
  unit: number;
}

@Component({
  selector: 'app-t-select',
  templateUrl: './t-select.component.html',
  styleUrls: ['./t-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TSelectComponent),
      multi: true,
    },
  ],
})
export class TSelectComponent implements OnInit, OnChanges, ControlValueAccessor {
  displayLabel = ''
  dropDown = false
  value: any = '';
  disable = false

  @Input() data: Array<any> = [];
  @Input() label: string = '';
  @Input() dataId: string = '';
  @Input() borderStyles = '';

  @Output() selectedData = new EventEmitter


  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.data
  }


  onChange: any = () => { }
  onTouch: any = () => { }

  writeValue(obj: any): void {
    if (obj) {
      this.value = obj;
      let selectedItem: any
      if (obj) {
        selectedItem = this.data.find((el) => el[this.dataId] === obj)
      }
      this.displayLabel = selectedItem[this.label]
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disable = isDisabled
  }


  ngOnChanges(changes: SimpleChanges): void {

    this.data = changes['data']['currentValue']

  }




  selectAllText(event: any) {
    let input = event.target
    input.select()
  }

  selectItem(item: any) {

    this.displayLabel = item[this.label];
    this.selectedData.emit(item)
  }

  onFocus() {
    this.dropDown = true
  }

  onBlur() {
    this.dropDown = false
  }

}
