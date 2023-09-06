import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatePillComponent } from './state-pill.component';

describe('StatePillComponent', () => {
  let component: StatePillComponent;
  let fixture: ComponentFixture<StatePillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatePillComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatePillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
