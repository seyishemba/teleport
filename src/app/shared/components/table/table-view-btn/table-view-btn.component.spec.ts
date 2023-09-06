import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableViewBtnComponent } from './table-view-btn.component';

describe('TableViewBtnComponent', () => {
  let component: TableViewBtnComponent;
  let fixture: ComponentFixture<TableViewBtnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableViewBtnComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableViewBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
