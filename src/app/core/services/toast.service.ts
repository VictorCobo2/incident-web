import { Injectable, signal } from '@angular/core';

export interface ToastState {
  show: boolean;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  readonly toast = signal<ToastState>({
    show: false,
    message: '',
    type: 'success'
  });

  show(message: string, type: ToastState['type'] = 'success'): void {
    this.toast.set({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide(): void {
    this.toast.set({
      show: false,
      message: '',
      type: 'success'
    });
  }
}