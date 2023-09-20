import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeleteConfirmModalComponent } from './components/delete-confirm-modal/delete-confirm-modal.component';

@NgModule({
  imports: [CommonModule],
  declarations: [DeleteConfirmModalComponent],
  exports: [DeleteConfirmModalComponent],
})
export class SharedModule {}
