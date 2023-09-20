import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../utils/toast.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly toasts = new BehaviorSubject<Toast[]>([]);

  public readonly toasts$ = this.toasts.asObservable();

  public show(
    message: Toast['message'],
    options: {
      success?: boolean;
      delay?: Toast['delay'];
    } = { delay: 1000 }
  ): void {
    const { delay, success } = options;

    this.toasts.next([
      ...this.toasts.value,
      {
        message,
        className: success ? 'bg-success text-light' : 'bg-danger text-light',
        delay,
      },
    ]);
  }
}
