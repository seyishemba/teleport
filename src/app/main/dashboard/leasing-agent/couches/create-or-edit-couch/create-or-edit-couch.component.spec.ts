import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrEditCouchComponent } from './create-or-edit-couch.component';

describe('CreateOrEditCouchComponent', () => {
  let component: CreateOrEditCouchComponent;
  let fixture: ComponentFixture<CreateOrEditCouchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateOrEditCouchComponent]
    });
    fixture = TestBed.createComponent(CreateOrEditCouchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
