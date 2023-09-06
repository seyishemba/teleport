import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TeleportTableComponent implements OnInit {
  @Output() addEntityEvent = new EventEmitter<void>();
  @Output() searchTable = new EventEmitter<string>();

  @Input() pageTitle: string = '';
  @Input() addEntityCTALabel: string = '';
  @Input() dropDownFilterPills: any[] = [];
  @Input() hasAddEntityCTA:boolean=true;
  @Input() emptyTableIcon: string = '';

  @Input() tableName: string = 'data';
  @Input() tableData: any[] = [];

  ngOnInit(): void {
    // console.log(this.tableData)
  }

  onAddEntity() {
  this.addEntityEvent.emit();
  }

  onSearch(event: string) {
    this.searchTable.emit(event);
  }
}
