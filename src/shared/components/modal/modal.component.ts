import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Output() closeModal = new EventEmitter<void>();

  onCloseModal() {
    this.closeModal.emit();
  }
}
