import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceScheduleListComponent } from './invoice-schedule-list.component';

describe('InvoiceScheduleListComponent', () => {
  let component: InvoiceScheduleListComponent;
  let fixture: ComponentFixture<InvoiceScheduleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceScheduleListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceScheduleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
