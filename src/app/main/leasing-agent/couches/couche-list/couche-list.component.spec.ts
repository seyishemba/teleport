import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoucheListComponent } from './couche-list.component';

describe('CoucheListComponent', () => {
  let component: CoucheListComponent;
  let fixture: ComponentFixture<CoucheListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CoucheListComponent]
    });
    fixture = TestBed.createComponent(CoucheListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
