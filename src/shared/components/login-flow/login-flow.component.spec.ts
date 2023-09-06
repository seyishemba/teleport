import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFlowComponent } from './login-flow.component';

describe('LoginFlowComponent', () => {
  let component: LoginFlowComponent;
  let fixture: ComponentFixture<LoginFlowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFlowComponent]
    });
    fixture = TestBed.createComponent(LoginFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
