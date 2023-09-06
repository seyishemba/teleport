import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-state-pill',
  templateUrl: './state-pill.component.html',
  styleUrls: ['./state-pill.component.css']
})
export class StatePillComponent {
  @Input() pillText: string = '';
  @Input() pillStyle: string = '';
}
