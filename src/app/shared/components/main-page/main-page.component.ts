import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { TableColumn } from 'pilgrim-ng-ui-library';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit, OnChanges {
  @Input() pageTitle: string = '';
  @Input() tabs: string[] = [];
  @Input() hasAddEntityCTA:boolean = false;
  @Input() addEntityCTALabel: string = '';
  @Input() hasTable: boolean = false;
  @Input() tableName: string = 'data';

  @Input() dropDownSortingList: string[] = [];
  @Input() filterPills: string[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() tableData: any[] = [];
  @Input() emptyTableIcon: string = '';

  @Output() addEntity = new EventEmitter<void>();
  @Output() switchTab = new EventEmitter<string>();
  @Output() addFilterPill = new EventEmitter<string>();
  @Output() removeFilterPill = new EventEmitter<number>();
  @Output() searchTable = new EventEmitter<string>();

  isAddFilterButtonClicked = false;
  filterText = '';

  constructor() {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['columns']) {
      console.log(this.columns);
    }
  }


  onAddEntity(): void {
    this.addEntity.emit();
  }

  onSearchTable(event: string) {
    this.searchTable.emit(event);
  }

  onSwitchTab(tabId: string): void {
    this.switchTab.emit(tabId);
  }

  onAddFilterButtonClick(): void {
    this.isAddFilterButtonClicked = true;
    if (this.isAddFilterButtonClicked === true) {
      setTimeout(() => {
        const filterInput = document.getElementById('filter-input');
        if (filterInput) {
          filterInput.focus();
        }
      }, 0);
    }
  }

  onAddFilter(): void {
    if (this.filterText !== '') {
      this.addFilterPill.emit(this.filterText);
    }

    this.isAddFilterButtonClicked = false;
  }

  onRemoveFilter(index: number): void {
    this.removeFilterPill.emit(index);
  }
}
