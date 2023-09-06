import { Component, ViewChild } from '@angular/core';
import { CreateOrEditCouchComponent } from '../create-or-edit-couch/create-or-edit-couch.component';
import { AppComponentBase } from '@shared/common/app-component-base';

@Component({
  selector: 'app-couche-list',
  templateUrl: './couche-list.component.html',
  styleUrls: ['./couche-list.component.css']
})
export class CoucheListComponent extends AppComponentBase  {
  @ViewChild('createCouchModal', { static: true }) createCouchModal: CreateOrEditCouchComponent;
  @ViewChild('couchModal', { static: true }) couchModal: CreateOrEditCouchComponent;



  createCouch(): void {
    this.createCouchModal.show();
}

  viewCouch():void{
    this.couchModal.show()
  }
}
