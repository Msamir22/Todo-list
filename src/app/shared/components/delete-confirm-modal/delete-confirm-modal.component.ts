import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-confirm-modal',
  templateUrl: './delete-confirm-modal.component.html',
})
export class DeleteConfirmModalComponent {
  public constructor(public modal: NgbActiveModal) {}

  public modalTitle: string = '';
  public confirmMessage: string = '';
  public itemToDelete: string = '';

  public dismiss(): void {
    this.modal.dismiss();
  }

  public confirm(): void {
    this.modal.close(true);
  }
}
