import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverLoginEmailComponent } from './driver-login-email.component';

describe('EmailComponent', () => {
  let component: DriverLoginEmailComponent;
  let fixture: ComponentFixture<DriverLoginEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverLoginEmailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriverLoginEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
