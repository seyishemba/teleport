import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingAgentLoginComponent } from './leasing-agent-login.component';

describe('LoginComponent', () => {
  let component: LeasingAgentLoginComponent;
  let fixture: ComponentFixture<LeasingAgentLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeasingAgentLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeasingAgentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
