import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceSchedulesComponent } from './invoice-schedules.component';

describe('InvoiceSchedulesComponent', () => {
  let component: InvoiceSchedulesComponent;
  let fixture: ComponentFixture<InvoiceSchedulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceSchedulesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceSchedulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
