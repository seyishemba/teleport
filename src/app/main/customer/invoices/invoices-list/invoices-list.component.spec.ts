import { ComponentFixture, TestBed } from '@angular/core/testing';
import {InvoicesListComponent} from '@app/main/customer/invoices/invoices-list/invoices-list.component';


describe('InvoicesListComponent', () => {
  let component: InvoicesListComponent;
  let fixture: ComponentFixture<InvoicesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoicesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoicesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
