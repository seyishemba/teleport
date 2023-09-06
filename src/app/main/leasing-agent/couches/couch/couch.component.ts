import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-couch',
  templateUrl: 'couch.component.html',
  styleUrls: ['couch.component.css']
})
export class CouchComponent extends AppComponentBase  {
  @ViewChild('createModal', { static: true }) modal: ModalDirective;
  active = false;

  constructor(
    injector: Injector,
) {
    super(injector);
}

  onShown(): void {
    // document.getElementById('TenancyName').focus();
}

show() {
  this.active = true;
  this.modal.show();

  // this._profileService.getPasswordComplexitySetting().subscribe((result) => {
  //     this.passwordComplexitySetting = result.setting;
  //     this.modal.show();
  // });
}

close(): void {
  this.active = false;
  this.modal.hide();
}

}

