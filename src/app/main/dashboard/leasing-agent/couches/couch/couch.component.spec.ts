import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouchComponent } from './couch.component';

describe('CouchComponent', () => {
  let component: CouchComponent;
  let fixture: ComponentFixture<CouchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CouchComponent]
    });
    fixture = TestBed.createComponent(CouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
