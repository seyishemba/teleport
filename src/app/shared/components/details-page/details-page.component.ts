import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css'],
})
export class DetailsPageComponent {
  @Input() previousPageTitle: string = '';
  @Input() pageTitle: string = '';

  constructor(private location: Location) {}

  onBackBtnClick(): void {
    this.location.back();
  }
}
