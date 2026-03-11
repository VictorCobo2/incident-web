import { CommonModule, DatePipe, NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, Subject, switchMap, startWith } from 'rxjs';
import { FormsModule } from '@angular/forms';

import { IncidentsService } from '../../services/incidents';
import { ToastService } from '../../../../core/services/toast.service';
import { IncidentStatus } from '../../models/incident.model';

@Component({
  selector: 'app-incident-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, RouterLink, NgClass, FormsModule],
  templateUrl: './incident-detail.html',
  styleUrl: './incident-detail.scss'
})
export class IncidentDetail {
  private readonly route = inject(ActivatedRoute);
  private readonly incidentsService = inject(IncidentsService);
  private readonly toastService = inject(ToastService);

  private readonly reload$ = new Subject<void>();

  readonly updatingStatus = signal(false);
  selectedStatus: IncidentStatus | '' = '';

  readonly vm$ = this.route.paramMap.pipe(
    map((params) => params.get('id')!),
    switchMap((id) =>
      this.reload$.pipe(
        startWith(void 0),
        switchMap(() => this.incidentsService.getIncidentById(id)),
        map((data) => {
          this.selectedStatus = data.incident.status as IncidentStatus;
          return data;
        }),
        catchError((error) => {
          console.error('Error loading incident detail', error);
          this.toastService.show('No fue posible cargar el detalle del incidente.', 'error');
          return of(null);
        })
      )
    )
  );

  getStatusClass(status: string): string {
    switch (status) {
      case 'OPEN':
        return 'bg-danger-subtle text-danger';
      case 'IN_PROGRESS':
        return 'bg-warning-subtle text-warning';
      case 'RESOLVED':
        return 'bg-success-subtle text-success';
      default:
        return 'bg-secondary-subtle text-secondary';
    }
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'HIGH':
        return 'bg-danger text-white';
      case 'MEDIUM':
        return 'bg-warning text-dark';
      case 'LOW':
        return 'bg-info text-dark';
      default:
        return 'bg-secondary text-white';
    }
  }

  updateStatus(currentStatus: string, incidentId: string): void {
    if (!this.selectedStatus || this.selectedStatus === currentStatus) {
      this.toastService.show('Selecciona un estado diferente.', 'warning');
      return;
    }

    this.updatingStatus.set(true);

    this.incidentsService
      .updateIncidentStatus(incidentId, { status: this.selectedStatus })
      .subscribe({
        next: () => {
          this.updatingStatus.set(false);
          this.toastService.show('Estado actualizado correctamente.', 'success');
          this.reload$.next();
        },
        error: (error) => {
          console.error('Error updating incident status', error);
          this.updatingStatus.set(false);

          const apiMessage =
            error?.error?.message || 'No fue posible actualizar el estado.';

          this.toastService.show(apiMessage, 'error');
        }
      });
  }
}