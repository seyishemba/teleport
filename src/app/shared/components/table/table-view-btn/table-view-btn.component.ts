import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-table-view-btn',
  templateUrl: './table-view-btn.component.html',
  styleUrls: ['./table-view-btn.component.css']
})
export class TableViewBtnComponent {
  @Output() btnClick = new EventEmitter();

  onClick() {
    this.btnClick.emit();
  }
}
