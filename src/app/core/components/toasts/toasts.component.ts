import { AsyncPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toasts',
  templateUrl: './toasts.component.html',
  standalone: true,
  imports: [NgbToastModule, NgFor, AsyncPipe],
  host: {
    class: 'toast-container position-fixed top-0 end-0 p-3',
    style: 'z-index: 1200',
  },
})
export class ToastsComponent {
  public constructor(private readonly toastService: ToastService) {}

  public readonly toasts$ = this.toastService.toasts$;
}
