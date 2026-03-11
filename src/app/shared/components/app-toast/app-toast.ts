import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-toast.html',
  styleUrl: './app-toast.scss'
})
export class AppToast {
  private readonly toastService = inject(ToastService);

  readonly toast = this.toastService.toast;

  readonly toastClass = computed(() => {
    const type = this.toast().type;

    switch (type) {
      case 'success':
        return 'text-bg-success';
      case 'error':
        return 'text-bg-danger';
      case 'warning':
        return 'text-bg-warning';
      case 'info':
        return 'text-bg-primary';
      default:
        return 'text-bg-success';
    }
  });

  close(): void {
    this.toastService.hide();
  }
}