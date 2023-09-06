import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeasingAgentLoginComponent } from './leasing-agent-login.component';

describe('LeasingAgentLoginComponent', () => {
  let component: LeasingAgentLoginComponent;
  let fixture: ComponentFixture<LeasingAgentLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeasingAgentLoginComponent]
    });
    fixture = TestBed.createComponent(LeasingAgentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
