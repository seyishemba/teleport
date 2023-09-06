import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceScheduleDetailComponent } from './invoice-schedule-detail.component';

describe('InvoiceScheduleDetailComponent', () => {
  let component: InvoiceScheduleDetailComponent;
  let fixture: ComponentFixture<InvoiceScheduleDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceScheduleDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceScheduleDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
