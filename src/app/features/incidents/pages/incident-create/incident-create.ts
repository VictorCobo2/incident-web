import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { finalize } from 'rxjs';
import { IncidentsService } from '../../services/incidents';
import { ToastService } from '../../../../core/services/toast.service';

@Component({
  selector: 'app-incident-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './incident-create.html',
  styleUrl: './incident-create.scss',
})
export class IncidentCreate {
  private readonly fb = inject(FormBuilder);
  private readonly incidentsService = inject(IncidentsService);
  private readonly router = inject(Router);
  private readonly toastService = inject(ToastService);
  private readonly cdr = inject(ChangeDetectorRef);

  loading = false;
  submitted = false;
  errorMessage = '';

  readonly form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(150)]],
    description: ['', [Validators.required, Validators.maxLength(1000)]],
    severity: ['HIGH', [Validators.required]],
    serviceId: ['', [Validators.required]],
  });

  get f() {
    return this.form.controls;
  }
  submit(): void {
    this.submitted = true;
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.incidentsService
      .createIncident({
        title: this.form.value.title!,
        description: this.form.value.description!,
        severity: this.form.value.severity!,
        serviceId: this.form.value.serviceId!,
      })
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.toastService.show('Incidente creado correctamente.', 'success');
          this.router.navigate(['/incidents']);
        },
        error: (error) => {
          console.error('Error creating incident', error);

          const apiMessage = error?.error?.message || 'No fue posible crear el incidente.';

          this.loading = false;
          this.submitted = false;
          this.cdr.detectChanges();

          this.toastService.show(apiMessage, 'error');
        },
      });
  }
}
